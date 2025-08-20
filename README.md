## Project Overview

This is a React application for the Start DSP Toolbox - a digital entrepreneurship resource platform that provides educational tools for universities and educators. The application serves as a web interface for browsing and accessing various entrepreneurship education resources.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture & Technology Stack

**Frontend Framework**: React 18 with Vite build tool
**Routing**: React Router v7
**Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
**UI Components**: Headless UI, Heroicons, Lucide React
**Additional Libraries**: React Select for form controls
**Routing Setup**: HashRouter for client-side compatibility
**Build System**: Vite 6.0.5 with modern ESLint flat config

## Key Components Structure

**Main Application Flow**:
- `App.jsx` - Main app component with routing setup
- Navigation components in `src/components/navigation/`
- Page components in `src/pages/` (AboutPage, ProjectPage, ToolkitPage, ToolDetailPage)

**Data Management**:
- Tool data stored in `src/data/tools.json` - contains comprehensive information about each educational tool including metadata, resources, and PDF links
- Static assets (PDFs, images) served from `public/assets/`

**Core Features**:
- Tool catalog with filtering and search capabilities
- Individual tool detail pages with downloadable resources
- Responsive design with mobile navigation support

## Important Data Structure

The tools.json file contains an array of tool objects with properties like:
- `number`, `name`, `summary`, `description`, `outcomes`, `instructions`
- `purpose` for filtering (6 main categories for entrepreneurship education)
- `prerequisiteTools`, `benefits` for additional metadata
- `links` array pointing to PDF resources in public/assets/pdfs/
- Navigation uses tool numbers in URLs: `/tool/:number`
- Contains `validOptions` object defining filter categories

## Static Asset Management

PDF files and images are stored in `public/assets/` and referenced directly in the tools data. When adding new tools, ensure corresponding PDF files are placed in `public/assets/pdfs/`.

## Tailwind Configuration

The project uses Tailwind CSS v4 with custom design tokens defined in `src/index.css`. Custom color palettes include:
- Grass colors (--color-grass-50 through --color-grass-950)
- Aqua colors (--color-aqua-50 through --color-aqua-950)
- Mandarine colors (--color-mandarine-50 through --color-mandarine-950)
- Seafoam colors (--color-seafoam-50 through --color-seafoam-950) - primary brand color
- Custom fonts: Avenir (sans) and Nexa (display)

## Asset Organization

**Images**: Two locations for tool images
- `src/assets/images/` - Source images (numbered 1.jpg through 24.jpg)
- `public/assets/images/` - Public images (same naming convention)

**PDFs**: All educational resources stored in `public/assets/pdfs/` with systematic naming:
- `tool_X.0.pdf` - Main tool documentation
- `tool_X.1.pdf` - Additional resources/templates
- Additional supporting files (calculators, templates, etc.)

## Key Application Features

**Search & Filter System** (`ToolkitPage.jsx`):
- Real-time text search with result highlighting
- Purpose-based dropdown filtering (6 categories)
- URL state persistence for search/filter parameters
- Responsive grid layout (1-3 columns)

**Smart Image Loading** (`ToolImage.jsx`):
- Progressive image format fallback (.jpg → .jpeg → .png)
- Picsum placeholder system for missing images
- Graceful error handling

**Navigation Architecture**:
- Main routes: `/` (About), `/project`, `/toolkit`, `/tool/:number`
- State-aware navigation (back button remembers search context)
- Responsive mobile menu with hamburger toggle
