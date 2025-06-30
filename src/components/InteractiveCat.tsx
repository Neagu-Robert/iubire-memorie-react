
import React, { useEffect, useRef, useState } from 'react';

const InteractiveCat = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwatting, setIsSwatting] = useState(false);
  const [swatAngle, setSwatAngle] = useState(0); // angle in degrees
  const [swatPhase, setSwatPhase] = useState(0); // 0: rest, 1: slap, 2: return
  const [animationPhase, setAnimationPhase] = useState(0); // For continuous animations
  const swatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pawRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoveCatHovered, setIsLoveCatHovered] = useState(false);
  const loveCatVideoRef = useRef<HTMLVideoElement>(null);

  // Continuous animation effect for tail and paw
  useEffect(() => {
    animationIntervalRef.current = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 120); // 120 frames for smooth cycle
    }, 50); // 50ms interval for smooth animation

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  // Calculate tail and paw positions based on animation phase
  const getTailRotation = () => {
    // Slow wagging motion using sine wave
    return Math.sin(animationPhase * 0.1) * 15; // ±15 degrees
  };

  const getPawRotation = () => {
    // Saluting motion in opposite direction to tail
    return Math.sin(animationPhase * 0.1 + Math.PI) * 20; // ±20 degrees, offset by π
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      updatePupilPositions(e.clientX, e.clientY);
      checkPawProximity(e.clientX, e.clientY);
    };

    const updatePupilPositions = (mouseX: number, mouseY: number) => {
      if (leftPupilRef.current && rightPupilRef.current && svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        
        // Convert mouse position to SVG coordinate system
        const svgMouseX = ((mouseX - svgRect.left) / svgRect.width) * 200;
        const svgMouseY = ((mouseY - svgRect.top) / svgRect.height) * 200;
        
        // Left eye center (85, 75) with radius constraint of 6 (pupil can move 6px from center)
        const leftEyeCenterX = 85;
        const leftEyeCenterY = 75;
        const maxDistance = 6;
        
        let leftDx = svgMouseX - leftEyeCenterX;
        let leftDy = svgMouseY - leftEyeCenterY;
        const leftDistance = Math.sqrt(leftDx * leftDx + leftDy * leftDy);
        
        if (leftDistance > maxDistance) {
          leftDx = (leftDx / leftDistance) * maxDistance;
          leftDy = (leftDy / leftDistance) * maxDistance;
        }
        
        leftPupilRef.current.setAttribute('cx', (leftEyeCenterX + leftDx).toString());
        leftPupilRef.current.setAttribute('cy', (leftEyeCenterY + leftDy).toString());
        
        // Right eye center (115, 75) with same radius constraint
        const rightEyeCenterX = 115;
        const rightEyeCenterY = 75;
        
        let rightDx = svgMouseX - rightEyeCenterX;
        let rightDy = svgMouseY - rightEyeCenterY;
        const rightDistance = Math.sqrt(rightDx * rightDx + rightDy * rightDy);
        
        if (rightDistance > maxDistance) {
          rightDx = (rightDx / rightDistance) * maxDistance;
          rightDy = (rightDy / rightDistance) * maxDistance;
        }
        
        rightPupilRef.current.setAttribute('cx', (rightEyeCenterX + rightDx).toString());
        rightPupilRef.current.setAttribute('cy', (rightEyeCenterY + rightDy).toString());
      }
    };

    const checkPawProximity = (mouseX: number, mouseY: number) => {
      if (pawRef.current && svgRef.current) {
        const pawRect = pawRef.current.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        const pawCenterX = pawRect.left + pawRect.width / 2;
        const pawCenterY = pawRect.top + pawRect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - pawCenterX, 2) + Math.pow(mouseY - pawCenterY, 2)
        );
        if (distance < 100) {
          // Calculate angle from paw to cursor (in SVG coordinates)
          const svgPawX = ((pawCenterX - svgRect.left) / svgRect.width) * 200;
          const svgPawY = ((pawCenterY - svgRect.top) / svgRect.height) * 200;
          const svgMouseX = ((mouseX - svgRect.left) / svgRect.width) * 200;
          const svgMouseY = ((mouseY - svgRect.top) / svgRect.height) * 200;
          const dx = svgMouseX - svgPawX;
          const dy = svgMouseY - svgPawY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI); // degrees
          setSwatAngle(angle);
          if (!isSwatting) setIsSwatting(true);
        } else {
          setIsSwatting(false);
          setSwatAngle(0); // Reset paw to default position
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSwatting]);

  // Swatting animation effect
  useEffect(() => {
    if (isSwatting) {
      if (!swatIntervalRef.current) {
        setSwatPhase(0);
        swatIntervalRef.current = setInterval(() => {
          setSwatPhase(prev => (prev === 0 ? 1 : 0));
        }, 100); // 100ms per slap (faster)
      }
    } else {
      if (swatIntervalRef.current) {
        clearInterval(swatIntervalRef.current);
        swatIntervalRef.current = null;
        setSwatPhase(0);
      }
    }
    return () => {
      if (swatIntervalRef.current) {
        clearInterval(swatIntervalRef.current);
        swatIntervalRef.current = null;
      }
    };
  }, [isSwatting]);

  return (
    <>
      {/* Remove global cursor hide and custom cursor */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
        /* Removed: * { cursor: none !important; } */
        @keyframes swatted {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>

      {/* Cat container - smaller and positioned higher */}
      <div className="flex justify-center">
        <div className="relative" style={{ backgroundColor: '#feeeed', borderRadius: '15px', padding: '20px' }}>
          <svg ref={svgRef} width="200" height="200" viewBox="0 0 200 200" className="relative">
            {/* Cat body */}
            <ellipse cx="100" cy="130" rx="60" ry="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Cat ears - moved slightly lower (down by 1 pixel) and rendered behind the head */}
            <polygon points="65,41 80,6 95,41" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            <polygon points="135,41 120,6 105,41" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Inner ears - matching new ear positions */}
            <polygon points="77,41 80,14 88,41" fill="#ffcccc" />
            <polygon points="123,41 120,14 112,41" fill="#ffcccc" />
            
            {/* Cat head */}
            <circle cx="100" cy="80" r="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Left eye */}
            <circle cx="85" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" />
            <circle ref={leftPupilRef} cx="85" cy="75" r="6" fill="black" />
            
            {/* Right eye */}
            <circle cx="115" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" />
            <circle ref={rightPupilRef} cx="115" cy="75" r="6" fill="black" />
            
            {/* Nose */}
            <polygon points="100,85 95,95 105,95" fill="#ff6666" />
            
            {/* Mouth */}
            <path d="M100,95 Q95,105 85,100" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M100,95 Q105,105 115,100" stroke="#333" strokeWidth="2" fill="none" />
            
            {/* Whiskers */}
            <line x1="60" y1="80" x2="80" y2="85" stroke="#333" strokeWidth="2" />
            <line x1="60" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="85" x2="140" y2="80" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="90" x2="140" y2="90" stroke="#333" strokeWidth="2" />
            
            {/* Paw for swatting - now with saluting animation */}
            <g
              ref={pawRef}
              id="Paw"
              className={"transition-transform duration-100"}
              style={{
                transformOrigin: '160px 120px',
                transform: `rotate(${isSwatting ? (swatPhase === 1 ? swatAngle + 60 : swatAngle) : getPawRotation()}deg)`
              }}
            >
              <ellipse cx="160" cy="120" rx="15" ry="25" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
              <circle cx="155" cy="110" r="4" fill="#ff6666" />
              <circle cx="165" cy="110" r="4" fill="#ff6666" />
              <circle cx="160" cy="105" r="4" fill="#ff6666" />
            </g>
            
            {/* Tail - now with wagging animation */}
            <g
              id="Tail"
              style={{
                transformOrigin: '50px 140px',
                transform: `rotate(${getTailRotation()}deg)`
              }}
            >
              <path d="M50,140 Q30,120 25,100 Q20,80 30,60" stroke="#ff6666" strokeWidth="12" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
      {/* Love Cat Animation - Bottom Left */}
      <div
        style={{ position: 'fixed', left: 0, bottom: 0, zIndex: 40 }}
        onMouseEnter={() => {
          setIsLoveCatHovered(true);
          if (loveCatVideoRef.current) {
            loveCatVideoRef.current.currentTime = 0;
            loveCatVideoRef.current.play();
          }
        }}
        onMouseLeave={() => {
          setIsLoveCatHovered(false);
          if (loveCatVideoRef.current) {
            loveCatVideoRef.current.pause();
            loveCatVideoRef.current.currentTime = 0;
          }
        }}
      >
        <video
          ref={loveCatVideoRef}
          src="/animations/love_cat.webm"
          width={180}
          height={180}
          loop
          muted
          style={{
            filter: isLoveCatHovered ? 'none' : 'grayscale(80%)',
            opacity: isLoveCatHovered ? 1 : 0.5,
            display: 'block',
            transition: 'filter 0.2s, opacity 0.2s'
          }}
        />
      </div>
    </>
  );
};

export default InteractiveCat;
