
# 💖 Personal Birthday Surprise Website

<!-- 
AI ASSISTANT NOTE: 
Please ALWAYS read this README.md file before making any edits to this project.
This file contains essential context about the project's purpose, structure, and requirements.
UPDATE this README whenever you make significant changes or add new features to keep it current.
-->

## 🎯 Project Purpose

This is a personal surprise birthday website created as a romantic gift for a girlfriend's birthday. The website presents a beautiful journey through the couple's relationship memories in an interactive timeline format, featuring smooth animations and an elegant design.

**Main Message**: "La mulți ani, iubito!" (Happy Birthday, my love!)
**Secondary Message**: "Am creat un mic traseu cu amintirile noastre" (I've created a small journey of our memories)

## ✨ Key Features

- **Hero Section**: Elegant landing page with purple-to-violet gradient background
- **Interactive Timeline**: 10 relationship milestones with folder-opening animations
- **Smooth Animations**: Scroll indicators, staggered reveals, and transition effects
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Romanian Language**: All text content is in Romanian for personal touch

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Landing section with title and scroll indicator
│   ├── Timeline.tsx          # Main timeline container with all memories
│   └── TimelineItem.tsx      # Individual memory item with folder animation
├── pages/
│   └── Index.tsx             # Main page combining Hero and Timeline
└── main.tsx                  # Application entry point
```

### Component Breakdown

- **Hero.tsx**: Full-screen landing section with animated background elements, title, and smooth scroll indicator
- **Timeline.tsx**: Container for all 10 relationship memories with intersection observer for animations
- **TimelineItem.tsx**: Reusable component for each memory with folder-like opening animation
- **Index.tsx**: Main page that orchestrates the Hero and Timeline components

## 🛠️ Technologies Used

- **React 18** - Modern functional components with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **Tanstack Query** - Data fetching and state management

### Styling Approach
- Gradient backgrounds (purple to violet theme)
- Smooth CSS transitions and animations
- Responsive design with mobile-first approach
- Custom animations for folder-opening effects

## 🎨 Design Philosophy

- **Romantic & Elegant**: Warm purple/pink color palette with soft gradients
- **Interactive**: Engaging animations that reveal content progressively
- **Personal**: Customized content celebrating relationship milestones
- **Smooth UX**: Seamless transitions and scroll behaviors

## 🎯 Timeline Content Structure

The website features 10 relationship milestones:
1. First meeting/date
2. First vacation together
3. First holiday celebration
4. First birthday celebration
5. First concert together
6. First "I love you" moment
7. First home together
8. Nature adventure
9. Dream realization
10. Current birthday celebration

Each timeline item includes:
- Emoji icon
- Romantic title
- Personal description
- Date/occasion reference
- Custom gradient color scheme

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

- Mobile-optimized timeline layout
- Touch-friendly interactive elements
- Adaptive typography scaling
- Flexible grid systems for different screen sizes

## 🎭 Animation Details

- **Hero animations**: Staggered text reveals with smooth opacity/transform transitions
- **Scroll indicator**: Bouncing arrow animation with smooth scroll behavior
- **Timeline reveals**: Intersection Observer triggers for progressive content loading
- **Folder animations**: CSS transforms creating folder-opening effect on click
- **Background elements**: Subtle floating animations for ambient atmosphere

---

*This project represents a personal labor of love, designed to celebrate relationship memories in a beautiful, interactive format.*
