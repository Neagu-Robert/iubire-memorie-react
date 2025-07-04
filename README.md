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
- **Vinyl Collection & Vintage Music Player**: Floating vintage music player button with spinning animation opens a vinyl collection overlay, letting you browse and play romantic songs with animated vinyl stack transitions, play/pause, shuffle, and navigation controls
- **Circular Gallery**: A unique gallery experience with 83 moments organized into 9 themed events, displayed in a horizontal arch with smooth navigation, event-based grouping, mouse wheel navigation, image enlargement modal, and an animated 'peek cat' at the bottom
- **Personal Favorites (PhotoStack)**: Dedicated page for favorite photos, featuring a draggable, animated stack-like photo browser with smooth transitions and navigation dots
- **Relationship Timeline**: 15 relationship milestones with two-step folder interaction (open folder, then expand to overlay with photos), subtle folder animations, close button, and gradient overlays
- **Special Events Timeline**: Separate timeline for holidays, birthdays, and other special occasions, with expandable overlay for each event, gradient backgrounds, and placeholder photo collection grid
- **Smooth Animations**: Scroll indicators, staggered reveals, folder transitions, interactive cat effects, new gallery/music player animations, and playful cat video overlays
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
- **FolderCard.tsx**: Animated, color-coded cards for each memory collection, arranged in an arch with swing and hover effects
- **InteractiveCat.tsx**: SVG cat with animated tail, paw, and eyes that follow the cursor, plus a 'love cat' video animation in the corner on hover
- **AnimatedCat.tsx**: Cat SVG that follows the cursor with idle/chasing animations, animated tail, and heart effects
- **VinylCollection.tsx**: Interactive vinyl record collection overlay with play/pause, shuffle, animated vinyl stack transitions, and navigation controls
- **VintageMusicPlayer.tsx**: Floating button with spinning animation that opens the Vinyl Collection overlay
- **CircularGallery.tsx**: Gallery of 83 moments in 9 themed events, with horizontal arch navigation, event grouping, mouse wheel navigation, image enlargement modal, and animated 'peek cat' at the bottom
- **PhotoStack.tsx**: Draggable, animated stack of photos for the Personal Favorites page, with navigation dots
- **Timeline.tsx**: Container for 15 relationship milestones with intersection observer for animations, two-step folder interaction, and expandable overlay with gradient background and photo collection grid
- **TimelineItem.tsx**: Reusable component for each memory with folder-opening animation, two-step interaction, and close button
- **EvenimenteSpecialeTimeline.tsx**: Special timeline for holidays, birthdays, and other events, with expandable overlay, gradient backgrounds, and photo collection grid
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
  - Two-step folder interaction (open folder, then expand to overlay with photos)
  - Folder-opening and photo collection animation
  - Expandable overlay with gradient background and placeholder photo collection grid

### Special Events Timeline

- Holidays, birthdays, graduations, and other special occasions
- Each event includes:
  - Emoji icon
  - Title, description, date
  - Expandable overlay with gradient background and photo collection grid

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

### Vinyl Collection & Music Player

- Floating vintage music player button (bottom-right) with spinning animation
- Opens a vinyl collection overlay with animated vinyl stack transitions
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
- Background images and playful cat video overlays for added atmosphere

## 🎭 Animation Details

- **Hero animations**: Staggered text reveals with smooth opacity/transform transitions and animated background elements
- **Scroll indicator**: Bouncing arrow animation with smooth scroll behavior
- **Timeline reveals**: Intersection Observer triggers for progressive content loading
- **Folder animations**: CSS transforms creating folder-opening effect on click, two-step interaction, and photo collection expansion
- **Timeline overlays**: Expandable overlays with gradient backgrounds and photo collection grids for each event
- **Cat animations**: Interactive SVG cat swats at or follows the cursor, with idle/chasing states, animated tail/paw/eyes, and 'love cat' video animation on hover
- **Vinyl/music player**: Animated vinyl stack transitions, floating player button with spinning animation, and interactive controls
- **Circular gallery**: Arch navigation, event grouping, mouse wheel navigation, image enlargement modal, and animated 'peek cat' at the bottom
- **PhotoStack**: Draggable, animated stack of photos for a playful experience, with navigation dots
- **Background elements**: Subtle floating animations, background images, and playful cat video overlays for ambient atmosphere

---

_This project represents a personal labor of love, designed to celebrate relationship memories in a beautiful, interactive, and playful format._
