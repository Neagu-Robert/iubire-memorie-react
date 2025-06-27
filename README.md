# 💖 Personal Birthday Surprise Website

<!-- 
AI ASSISTANT NOTE: 
Please ALWAYS read this README.md file before making any edits to this project.
This file contains essential context about the project's purpose, structure, and requirements.
UPDATE this README whenever you make significant changes or add new features to keep it current.
-->

## 🎯 Project Purpose

This is a personal surprise birthday website created as a romantic gift for a girlfriend's birthday. The website presents a beautiful journey through the couple's relationship memories in an interactive timeline format, featuring smooth animations, playful elements, and an elegant design.

**Main Message**: "La mulți ani, iubito!" (Happy Birthday, my love!)
**Secondary Message**: "Am creat un mic traseu cu amintirile noastre" (I've created a small journey of our memories)

## ✨ Key Features

- **Hero Section**: Elegant landing page with purple-to-violet gradient background
- **Interactive Folder Navigation**: Four animated folder cards, each representing a collection of memories or events
- **Interactive Cat**: Playful cat animation that follows or reacts to the cursor on the homepage
- **Relationship Timeline**: 15 relationship milestones with folder-opening and photo collection animations
- **Special Events Timeline**: Separate timeline for holidays, birthdays, and other special occasions, with expandable photo galleries
- **Smooth Animations**: Scroll indicators, staggered reveals, folder transitions, and interactive cat effects
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Romanian Language**: All text content is in Romanian for a personal touch

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero.tsx                  # Landing section with title and scroll indicator
│   ├── FolderCard.tsx            # Animated folder cards for navigation
│   ├── InteractiveCat.tsx        # Playful cat that interacts with the cursor
│   ├── AnimatedCat.tsx           # (Optional) Cat that follows the cursor around the screen
│   ├── Timeline.tsx              # Main timeline container with all relationship memories
│   ├── TimelineItem.tsx          # Individual memory item with folder animation
│   ├── EvenimenteSpecialeTimeline.tsx # Timeline for special events (holidays, birthdays, etc.)
├── pages/
│   ├── Index.tsx                 # Main page combining Hero, FolderCards, and InteractiveCat
│   ├── TimelinePage.tsx          # Page for the main relationship timeline
│   ├── EvenimenteSpecialePage.tsx# Page for the special events timeline
│   └── NotFound.tsx              # 404 page
└── main.tsx                      # Application entry point
```

### Component Breakdown

- **Hero.tsx**: Full-screen landing section with animated background elements, title, and smooth scroll indicator
- **FolderCard.tsx**: Animated, color-coded cards for each memory collection, arranged in an arch
- **InteractiveCat.tsx**: Custom cursor and cat that swats at the cursor when nearby
- **AnimatedCat.tsx**: (Optional) Cat that follows the cursor with idle/chasing animations
- **Timeline.tsx**: Container for 15 relationship milestones with intersection observer for animations
- **TimelineItem.tsx**: Reusable component for each memory with folder-opening and photo collection animation
- **EvenimenteSpecialeTimeline.tsx**: Special timeline for holidays, birthdays, and other events, with expandable photo galleries
- **Index.tsx**: Main page orchestrating the Hero, FolderCards, and InteractiveCat

## 🛠️ Technologies Used

- **React 18** - Modern functional components with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing

### Styling Approach
- Gradient backgrounds (purple to violet theme)
- Smooth CSS transitions and animations
- Responsive design with mobile-first approach
- Custom animations for folder-opening, timeline reveals, and interactive cat effects

## 🎨 Design Philosophy

- **Romantic & Elegant**: Warm purple/pink color palette with soft gradients
- **Interactive**: Engaging animations that reveal content progressively
- **Playful**: Animated cat and folder interactions for a fun, memorable experience
- **Personal**: Customized content celebrating relationship milestones
- **Smooth UX**: Seamless transitions and scroll behaviors

## 🎯 Timeline Content Structure

### Main Timeline
- 15 relationship milestones, each with:
  - Emoji icon
  - Romantic title
  - Personal description
  - Date/occasion reference
  - Custom gradient color scheme
  - Folder-opening and photo collection animation

### Special Events Timeline
- Holidays, birthdays, graduations, and other special occasions
- Each event includes:
  - Emoji icon
  - Title, description, date
  - Expandable overlay with photo gallery

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Features

- Mobile-optimized timeline and folder layout
- Touch-friendly interactive elements
- Adaptive typography scaling
- Flexible grid systems for different screen sizes

## 🎭 Animation Details

- **Hero animations**: Staggered text reveals with smooth opacity/transform transitions
- **Scroll indicator**: Bouncing arrow animation with smooth scroll behavior
- **Timeline reveals**: Intersection Observer triggers for progressive content loading
- **Folder animations**: CSS transforms creating folder-opening effect on click, with photo collection expansion
- **Cat animations**: Interactive cat swats at or follows the cursor, with idle and chasing states
- **Background elements**: Subtle floating animations for ambient atmosphere

---

*This project represents a personal labor of love, designed to celebrate relationship memories in a beautiful, interactive, and playful format.*
