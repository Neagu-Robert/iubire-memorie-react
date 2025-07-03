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
- **Interactive Folder Navigation**: Four animated folder cards, each representing a collection of memories or events:
  - Primele noastre (Relationship Timeline)
  - Evenimente speciale (Special Events)
  - Galeria Circulară (Circular Gallery)
  - Preferate personale (Personal Favorites)
- **Interactive Cat**: Playful cat animation that follows or reacts to the cursor on the homepage
- **Vinyl Collection & Vintage Music Player**: Floating vintage music player button opens a vinyl collection overlay, letting you browse and play romantic songs with animated vinyl transitions, play/pause, and shuffle controls
- **Circular Gallery**: A unique gallery experience with 83 moments organized into 9 themed events, displayed in a horizontal arch with smooth navigation and event-based grouping
- **Personal Favorites (PhotoStack)**: Dedicated page for favorite photos, featuring a draggable, stack-like photo browser for a tactile, playful experience
- **Relationship Timeline**: 15 relationship milestones with folder-opening and photo collection animations
- **Special Events Timeline**: Separate timeline for holidays, birthdays, and other special occasions, with expandable photo galleries
- **Smooth Animations**: Scroll indicators, staggered reveals, folder transitions, interactive cat effects, and new gallery/music player animations
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
│   ├── VinylCollection.tsx       # Vinyl record collection overlay with music controls
│   ├── VintageMusicPlayer.tsx    # Floating vintage music player button
│   ├── CircularGallery.tsx       # Circular gallery with themed events and arch navigation
│   ├── PhotoStack.tsx            # Draggable stack photo browser for favorites
│   └── ui/                       # Reusable UI component library (carousel, chart, sidebar, etc.)
├── pages/
│   ├── Index.tsx                 # Main page combining Hero, FolderCards, and InteractiveCat
│   ├── TimelinePage.tsx          # Page for the main relationship timeline
│   ├── EvenimenteSpecialePage.tsx# Page for the special events timeline
│   ├── CircularGalleryPage.tsx   # Page for the circular gallery experience
│   ├── PreferatePersonalePage.tsx# Page for personal favorites (PhotoStack)
│   └── NotFound.tsx              # 404 page
└── main.tsx                      # Application entry point
```

### Component Breakdown

- **Hero.tsx**: Full-screen landing section with animated background elements, title, and smooth scroll indicator
- **FolderCard.tsx**: Animated, color-coded cards for each memory collection, arranged in an arch
- **InteractiveCat.tsx**: Custom cursor and cat that swats at the cursor when nearby
- **AnimatedCat.tsx**: (Optional) Cat that follows the cursor with idle/chasing animations
- **VinylCollection.tsx**: Interactive vinyl record collection overlay with play/pause, shuffle, and animated transitions
- **VintageMusicPlayer.tsx**: Floating button that opens the Vinyl Collection overlay
- **CircularGallery.tsx**: Gallery of 83 moments in 9 themed events, with arch navigation and event grouping
- **PhotoStack.tsx**: Draggable stack of photos for the Personal Favorites page
- **Timeline.tsx**: Container for 15 relationship milestones with intersection observer for animations
- **TimelineItem.tsx**: Reusable component for each memory with folder-opening and photo collection animation
- **EvenimenteSpecialeTimeline.tsx**: Special timeline for holidays, birthdays, and other events, with expandable photo galleries
- **Index.tsx**: Main page orchestrating the Hero, FolderCards, InteractiveCat, VintageMusicPlayer, and VinylCollection
- **ui/**: Library of reusable UI components (carousel, chart, sidebar, etc.) for extensibility and consistent design

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
- Custom animations for folder-opening, timeline reveals, interactive cat effects, vinyl/music player, and galleries

## 🎨 Design Philosophy

- **Romantic & Elegant**: Warm purple/pink color palette with soft gradients
- **Interactive**: Engaging animations that reveal content progressively
- **Playful**: Animated cat, vinyl music player, and folder/gallery interactions for a fun, memorable experience
- **Personal**: Customized content celebrating relationship milestones and favorite moments
- **Smooth UX**: Seamless transitions and scroll behaviors

## 🎯 Timeline & Gallery Content Structure

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

### Circular Gallery

- 83 moments organized into 9 themed events
- Horizontal arch navigation with smooth transitions
- Each event features a title, description, and themed images

### Personal Favorites (PhotoStack)

- Dedicated page for favorite photos
- Draggable, stack-like photo browser for tactile navigation

### Vinyl Collection & Music Player

- Floating vintage music player button (bottom-right)
- Opens a vinyl collection overlay with animated vinyl transitions
- Play/pause, shuffle, and song navigation controls

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
- Touch-friendly interactive elements (PhotoStack, galleries, music player)
- Adaptive typography scaling
- Flexible grid systems for different screen sizes

## 🎭 Animation Details

- **Hero animations**: Staggered text reveals with smooth opacity/transform transitions
- **Scroll indicator**: Bouncing arrow animation with smooth scroll behavior
- **Timeline reveals**: Intersection Observer triggers for progressive content loading
- **Folder animations**: CSS transforms creating folder-opening effect on click, with photo collection expansion
- **Cat animations**: Interactive cat swats at or follows the cursor, with idle and chasing states
- **Vinyl/music player**: Animated vinyl transitions, floating player button, and interactive controls
- **Circular gallery**: Arch navigation, event grouping, and smooth image transitions
- **PhotoStack**: Draggable, animated stack of photos for a playful experience
- **Background elements**: Subtle floating animations for ambient atmosphere

---

_This project represents a personal labor of love, designed to celebrate relationship memories in a beautiful, interactive, and playful format._
