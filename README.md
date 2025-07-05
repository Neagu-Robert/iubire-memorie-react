
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

- **Hero Section**: Elegant landing page with purple-to-violet gradient background and animated background elements
- **Interactive Folder Navigation**: Four animated folder cards, each representing a collection of memories or events, arranged in an arch with hover and swing-in/out animations
- **Interactive Cat**: SVG cat with animated tail, paw, and eyes that follow the cursor, plus a 'love cat' video animation in the corner on hover
- **Animated Cat**: Cat SVG that follows the cursor around the screen, with idle/chasing states, animated tail, and heart effects
- **Global Music Player System**: Comprehensive music player available across all pages with:
  - Floating vintage music player button with spinning animation
  - Animated playlist interface replacing vinyl collection overlay
  - Real song library from all `songs` directory folders (timeline, special_events, favourite_activities, my_favourites)
  - Smart playback controls with pause/resume maintaining current position
  - Horizontal volume slider with visual feedback
  - Auto-pause functionality during animated collages to prevent audio conflicts
  - Play/pause, shuffle, next/previous track controls
  - Visual song highlighting and animated playlist display
- **Circular Gallery**: A unique gallery experience with 83 moments organized into 9 themed events, displayed in a horizontal arch with smooth navigation, event-based grouping, mouse wheel navigation, image enlargement modal, and an animated 'peek cat' at the bottom
- **Personal Favorites (PhotoStack)**: Dedicated page for favorite photos, featuring a draggable, animated stack-like photo browser with smooth transitions and navigation dots
- **Relationship Timeline**: 15 relationship milestones with two-step folder interaction (open folder, then choose viewing mode), mode selector overlay for choosing between normal browsing or animated collage with music, photo collection viewer with different display modes, and gradient overlays
- **Special Events Timeline**: Separate timeline for holidays, birthdays, and other special occasions, with expandable overlay for each event, mode selector for viewing options, animated collage with music support, and gradient backgrounds
- **Photo Viewing System**: Dual-mode photo viewing with normal browsing (PhotoStack component) and animated collage mode with synchronized music playback, auto-advancing slideshow, and playback controls
- **Smooth Animations**: Scroll indicators, staggered reveals, folder transitions, interactive cat effects, music player animations, and playful cat video overlays
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
│   ├── TimelineItem.tsx          # Individual memory item with folder animation and mode selection
│   ├── EvenimenteSpecialeTimeline.tsx # Timeline for special events (holidays, birthdays, etc.)
│   ├── ModeSelector.tsx          # Modal for choosing between browse and collage modes
│   ├── PhotoCollectionViewer.tsx # Main photo viewer component handling both browse and collage modes
│   ├── AnimatedCollage.tsx       # Animated slideshow with music synchronization and auto-pause
│   ├── VinylCollection.tsx       # Music player overlay with animated playlist and volume control
│   ├── VintageMusicPlayer.tsx    # Floating vintage music player button (global access)
│   ├── AnimatedPlaylist.tsx      # Animated song list with current track highlighting
│   ├── CircularGallery.tsx       # Circular gallery with themed events and arch navigation
│   ├── PhotoStack.tsx            # Draggable stack photo browser for normal browsing
│   └── ui/                       # Reusable UI component library (carousel, chart, sidebar, slider, etc.)
├── contexts/
│   └── MusicContext.tsx          # Global music state management with pause/resume and volume control
├── pages/
│   ├── Index.tsx                 # Main page combining Hero, FolderCards, and InteractiveCat
│   ├── TimelinePage.tsx          # Page for the main relationship timeline (with music player)
│   ├── EvenimenteSpecialePage.tsx# Page for the special events timeline (with music player)
│   ├── CircularGalleryPage.tsx   # Page for the circular gallery experience (with music player)
│   ├── PreferatePersonalePage.tsx# Page for personal favorites (PhotoStack) (with music player)
│   └── NotFound.tsx              # 404 page
└── main.tsx                      # Application entry point with MusicProvider wrapper
```

### Component Breakdown

- **Hero.tsx**: Full-screen landing section with animated background elements, title, and smooth scroll indicator
- **FolderCard.tsx**: Animated, color-coded cards for each memory collection, arranged in an arch with swing and hover effects
- **InteractiveCat.tsx**: SVG cat with animated tail, paw, and eyes that follow the cursor, plus a 'love cat' video animation in the corner on hover
- **AnimatedCat.tsx**: Cat SVG that follows the cursor with idle/chasing animations, animated tail, and heart effects
- **MusicContext.tsx**: Global state management for music playback across all pages, including:
  - Real song library from multiple directories
  - Pause/resume functionality maintaining playback position
  - Volume control with audio element synchronization
  - Auto-pause during animated collages
  - Global music state accessible from any page
- **VinylCollection.tsx**: Music player overlay featuring:
  - Animated playlist interface replacing vinyl disc display
  - Current song highlighting at the top
  - Horizontal volume slider with visual feedback
  - Play/pause, shuffle, next/previous controls
  - Visual song progression indicators
- **VintageMusicPlayer.tsx**: Floating button available on all pages with spinning animation that opens the music player overlay
- **AnimatedPlaylist.tsx**: Dynamic song list component with:
  - Current playing song header with large display
  - Scrollable playlist with all songs from directories
  - Visual indicators for currently playing track
  - Animated elements and smooth selection
- **CircularGallery.tsx**: Gallery of 83 moments in 9 themed events, with horizontal arch navigation, event grouping, mouse wheel navigation, image enlargement modal, and animated 'peek cat' at the bottom
- **PhotoStack.tsx**: Draggable, animated stack of photos for normal browsing mode, with navigation dots and smooth transitions
- **Timeline.tsx**: Container for 15 relationship milestones with intersection observer for animations, two-step folder interaction, mode selection, and photo viewing integration
- **TimelineItem.tsx**: Reusable component for each memory with folder-opening animation, two viewing mode buttons (normal and collage), and event handling
- **EvenimenteSpecialeTimeline.tsx**: Special timeline for holidays, birthdays, and other events, with mode selection and photo viewing capabilities
- **ModeSelector.tsx**: Modal overlay component for choosing between "Vezi pozele normal" (normal browsing) and "Vezi cu melodie surpriză" (animated collage with music)
- **PhotoCollectionViewer.tsx**: Main photo viewing component that handles both browse mode (using PhotoStack) and collage mode (using AnimatedCollage)
- **AnimatedCollage.tsx**: Full-screen animated slideshow component with:
  - Music synchronization and auto-pause functionality
  - Auto-advancing photos with smooth transitions
  - Play/pause and restart controls
  - Integration with global music context to prevent conflicts
- **ui/**: Library of reusable UI components (carousel, chart, sidebar, slider, etc.) for extensibility and consistent design

## 🛠️ Technologies Used

- **React 18** - Modern functional components with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **Radix UI** - Accessible component primitives (including Slider for volume control)

### Styling Approach

- Gradient backgrounds (purple to violet theme)
- Smooth CSS transitions and animations
- Responsive design with mobile-first approach
- Custom animations for folder-opening, timeline reveals, interactive cat effects, music player interface, photo viewing modes, and galleries

## 🎨 Design Philosophy

- **Romantic & Elegant**: Warm purple/pink color palette with soft gradients
- **Interactive**: Engaging animations that reveal content progressively
- **Playful**: Animated cat, global music player, dual-mode photo viewing, and folder/gallery interactions for a fun, memorable experience
- **Personal**: Customized content celebrating relationship milestones and favorite moments with personalized music selections from real song files
- **Smooth UX**: Seamless transitions, scroll behaviors, intuitive mode switching, and uninterrupted music experience across pages

## 🎯 Timeline & Gallery Content Structure

### Main Timeline

- 15 relationship milestones, each with:
  - Emoji icon
  - Romantic title
  - Personal description
  - Date/occasion reference
  - Custom gradient color scheme
  - Two-step interaction: open folder, then choose viewing mode
  - Mode selection between normal browsing and animated collage
  - Music integration for collage mode (specific songs mapped to each milestone)
  - Photo collection viewer with smooth transitions

### Special Events Timeline

- Holidays, birthdays, graduations, and other special occasions
- Each event includes:
  - Emoji icon
  - Title, description, date
  - Mode selection for photo viewing
  - Music support for applicable events
  - Animated collage option with synchronized music

### Photo Viewing Modes

1. **Normal Browsing ("Vezi pozele normal")**:
   - Uses PhotoStack component
   - Draggable, tactile photo navigation
   - Navigation dots for easy browsing
   - Smooth transitions between photos

2. **Animated Collage ("Vezi cu melodie surpriză")**:
   - Full-screen slideshow experience
   - Automatic photo advancement synchronized with music
   - Play/pause and restart controls
   - Auto-pause of global music player to prevent conflicts
   - Volume control and music loop functionality
   - Smooth fade transitions between photos

### Circular Gallery

- 83 moments organized into 9 themed events
- Horizontal arch navigation with smooth transitions
- Event-based grouping and navigation
- Mouse wheel navigation for browsing
- Image enlargement modal on click
- Animated 'peek cat' video at the bottom of the gallery

### Personal Favorites (PhotoStack)

- Dedicated page for favorite photos
- Draggable, animated stack-like photo browser for tactile navigation
- Smooth transitions and navigation dots

### Global Music Player System

- **Floating Player**: Available on all pages (main and secondary) in bottom-right corner
- **Real Song Library**: Automatically loads all songs from:
  - `/songs/timeline/` - 13 songs for relationship timeline
  - `/songs/special_events/` - 6 songs for special occasions
  - `/songs/favourite_activities/` - 1 song for activities
  - `/songs/my_favourites/` - 1 song for personal favorites
- **Smart Playback**: 
  - Maintains playback position when pausing/resuming
  - Auto-pauses during animated collages to prevent audio conflicts
  - Smooth transitions between songs
- **Volume Control**: Horizontal slider with real-time audio adjustment
- **Playlist Interface**: 
  - Animated list replacing vinyl disc display
  - Current song highlighted at top with large display
  - Visual progress indicators for playing tracks
  - Smooth song selection and transitions

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

- Mobile-optimized timeline, gallery, and folder layout
- Touch-friendly interactive elements (PhotoStack, galleries, music player, mode selection)
- Adaptive typography scaling
- Flexible grid systems for different screen sizes
- Global music player accessible on all device sizes
- Background images and playful cat video overlays for added atmosphere

## 🎭 Animation Details

- **Hero animations**: Staggered text reveals with smooth opacity/transform transitions and animated background elements
- **Scroll indicator**: Bouncing arrow animation with smooth scroll behavior
- **Timeline reveals**: Intersection Observer triggers for progressive content loading
- **Folder animations**: CSS transforms creating folder-opening effect on click, two-step interaction, and mode selection
- **Photo viewing transitions**: Smooth mode switching between normal browsing and animated collage
- **Music synchronization**: Auto-advancing slideshow synchronized with music playback in collage mode, with auto-pause functionality
- **Cat animations**: Interactive SVG cat swats at or follows the cursor, with idle/chasing states, animated tail/paw/eyes, and 'love cat' video animation on hover
- **Music player interface**: 
  - Floating player button with spinning animation
  - Animated playlist with smooth song transitions
  - Visual feedback for volume control
  - Current track highlighting and progression indicators
- **Circular gallery**: Arch navigation, event grouping, mouse wheel navigation, image enlargement modal, and animated 'peek cat' at the bottom
- **PhotoStack**: Draggable, animated stack of photos for a playful browsing experience, with navigation dots
- **Background elements**: Subtle floating animations, background images, and playful cat video overlays for ambient atmosphere

## 🎵 Music Integration

- **Global Music System**: Centralized music context available across all pages
- **Real Song Library**: Automatic loading of all actual song files from multiple directories
- **Timeline Music Mapping**: Each timeline milestone has a specific song mapped to it for the animated collage mode
- **Special Events Music**: Selected special events have associated music for enhanced viewing experience
- **Smart Audio Management**: 
  - Auto-pause global player during animated collages
  - Maintain playback position across pause/resume cycles
  - Volume control with real-time audio adjustment
- **Music Controls**: Play/pause, next/previous, shuffle, restart, and volume controls
- **Auto-sync**: Photos advance automatically in rhythm with the music playback
- **Conflict Prevention**: Intelligent audio management prevents multiple songs playing simultaneously

---

_This project represents a personal labor of love, designed to celebrate relationship memories in a beautiful, interactive, and playful format with a comprehensive global music system and dual-mode photo viewing experiences._
