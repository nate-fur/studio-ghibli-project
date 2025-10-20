# Studio Ghibli Film Cards Application

A responsive React application that displays Studio Ghibli film information using a GraphQL backend that integrates with the public Studio Ghibli API. Features interactive, flipable cards with smooth animations and mobile-responsive design.

![Studio Ghibli Films App](designs/2-loaded.png)

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm 10+ (required package manager)
- Git

### Installation & Running

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the backend server**

   ```bash
   cd packages/backend
   pnpm dev
   ```

   The GraphQL server will start on `http://localhost:8080/graphql`

3. **Start the frontend development server** (in a new terminal)

   ```bash
   cd packages/frontend
   pnpm dev
   ```

   The React app will be available at `http://localhost:3000`

4. **Generate GraphQL types** (if needed)
   ```bash
   cd packages/frontend
   pnpm codegen
   ```

### Running Tests

```bash
# Run all tests
pnpm test

# Run backend tests only
pnpm test:backend

# Run frontend tests only
pnpm test:frontend

# Watch mode for development
pnpm test:watch
```

## 📋 Project Overview

This application demonstrates a complete full-stack implementation featuring:

### Frontend Features

- **Interactive Film Cards**: Four beautifully designed cards representing Studio Ghibli films
- **Smooth Animations**: CSS-based flip animations with 60fps performance
- **Loading States**: Visual feedback with loading spinners during data fetching
- **Mobile Responsive**: Single-column layout on mobile devices with touch interactions
- **GraphQL Integration**: Type-safe operations using Apollo Client and code generation

### Backend Features

- **GraphQL API**: Apollo Server with Nexus for schema definition
- **Studio Ghibli Integration**: Service layer connecting to the public Studio Ghibli API
- **Error Handling**: Comprehensive error handling with proper GraphQL error responses
- **Type Safety**: Full TypeScript implementation with generated types

### Key Components

- **FilmCard Component**: Interactive cards with flip animations and responsive design
- **useFilmData Hook**: Custom hook managing film data state and GraphQL operations
- **StudioGhibliService**: Backend service for API integration with proper error handling
- **Toast Context**: App-wide notification system for user feedback

## 🔄 Dev-Tasks Process

This project was developed using the structured dev-tasks workflow as required:

### 1. Product Requirements Document (PRD)

- Created `tasks/prd-studio-ghibli.md` with comprehensive requirements
- Defined user stories, functional requirements, and design specifications
- Included detailed technical considerations and success metrics

### 2. Task Breakdown

- Generated `tasks/tasks-prd-studio-ghibli.md` with actionable subtasks
- Organized tasks into logical development phases:
  - Backend GraphQL setup and API integration
  - Frontend layout and responsive design
  - GraphQL integration and data fetching
  - Loading states and user feedback
  - Card animations and interactions

### 3. Structured Development

- Completed tasks systematically with conventional commit messages
- Maintained "Relevant Files" section for tracking implementation
- Used proper testing strategy with unit and integration tests
- Followed git best practices with descriptive commit messages

### 4. Documentation

- All tasks marked as completed `[x]` in the task file
- Comprehensive test coverage for critical components
- Clean, maintainable code following TypeScript best practices

## ⏱️ Time Spent

**Total Development Time: ~4.5 hours**

Breakdown:

- **Planning & Setup**: 30 minutes
- **Backend Development**: 1.5 hours
  - GraphQL schema design and implementation
  - Studio Ghibli API integration
  - Error handling and testing
- **Frontend Development**: 2.5 hours
  - Component architecture and styling
  - GraphQL integration and data management
  - Animations and responsive design
- **Testing & Refinement**: 30 minutes
  - Unit tests and integration testing
  - Bug fixes and performance optimization

## 🏗️ Rationale

### Technology Choices

**Frontend Stack:**

- **React 18**: Latest React features with concurrent rendering
- **TypeScript**: Type safety and better developer experience
- **Apollo Client**: Robust GraphQL client with caching and error handling
- **Material-UI**: Consistent design system with accessibility features
- **Emotion/Styled Components**: CSS-in-JS for component-scoped styling
- **Vite**: Fast development server and build tooling

**Backend Stack:**

- **Apollo Server**: Production-ready GraphQL server
- **Nexus**: Type-safe GraphQL schema definition
- **Axios**: Reliable HTTP client for API integration
- **Express**: Lightweight web framework for middleware

### Architectural Decisions

1. **Monorepo Structure**: Used Lerna for managing frontend and backend packages
2. **GraphQL Code Generation**: Ensured type safety across the full stack
3. **Custom Hooks**: Encapsulated data fetching logic for reusability
4. **Service Layer Pattern**: Separated API logic from GraphQL resolvers
5. **Component Composition**: Modular design with reusable styled components
6. **Top level error handling**: Graceful error handling with user-friendly feedback via toasts

## 🚧 Challenges

1. **Card Flipping Animation Coordination**

   - Ensuring that the back of the card didn't show during parts of the animations was tricky to coordinate with other animations on the card, such as fading in the movie image when loading was finished
   - **Solution**: Implemented careful timing coordination between flip animations and image fade transitions, using opacity controls and proper z-index management

2. **Cursor Rules Configuration Issues**

   - The agents didn't always respect the rules in the cursor rules folder, requiring investigation into documentation
   - **Solution**: Removed the dot in front of "rules" within the .cursor folder, which seemed to fix the configuration issues

3. **Type Safety in Error Handling**

   - Type safety on error handling was tricky to get right, leading to casting the unknown error to type `any` during development
   - **Impact**: This was intended to be a temporary fix with plans to properly type errors later, but time constraints prevented addressing this technical debt

4. **Responsive Design for Mid-Sized Screens**
   - Ensuring that text was not truncated messily on mid-sized screens where cards were too small
   - **Solution**: Added minimum height and minimum width constraints to the cards to prevent them from becoming too compressed and causing text truncation issues

## ⚠️ Limitations

### Current Limitations

1. **Artificial Loading Delay**: There is a 1-second timeout in one of the resolvers to better showcase the loading state
2. **No Data Persistence**: Film data is fetched fresh on each page load
3. **Limited Error Recovery**: Network errors require manual retry
4. **No Offline Support**: Application requires internet connection
5. **External Image Dependencies**: Relies on Studio Ghibli API for images

### Known Issues

1. **Rotten Tomatoes Logo**: Uses external image URL that may become unavailable
2. **Network Timeout**: No custom timeout handling for slow API responses
3. **Image Optimization**: No image compression or optimization for faster loading

## 🔮 Future Improvements

1. **Smoothing Out Card Flipping Animations**

   - Implement debouncing for hover animations to prevent rapid state changes
   - Add smoother fade-in transitions for content on the back of cards
   - Optimize animation timing and easing functions for better user experience

2. **More Scalable Backend Architecture**

   - Implement singleton pattern for StudioGhibliService to avoid instantiating new instances on each resolver call
   - Pass service instances through GraphQL context instead of creating them at the resolver level
   - Create a dependency injection system for better service management and testing
   - Optimize memory usage and improve performance when scaling to multiple resolvers and routes
   - Establish a proper service layer architecture for future API integrations and business logic expansion

3. **UI/UX Refinements to Match Design Specs**

   - Access the original Zeplin mockups to precisely match dimensions and styling
   - Replace hard-coded widths and heights with exact measurements from design files
   - Update typography to use the specific fonts defined in the design system
   - Fine-tune spacing, colors, and visual elements to achieve pixel-perfect accuracy

4. **Enhanced Testing Coverage**

   - Create end-to-end tests for complete user workflows
   - Add comprehensive frontend unit tests for all components and hooks
   - Implement more thorough integration tests for Studio Ghibli API connectivity
   - Add visual regression tests to ensure UI consistency

5. **Design System Implementation**

   - Create a comprehensive design system to eliminate magic numbers throughout the codebase
   - Establish consistent container widths (currently hard-coded to 1280px on homepage)
   - Standardize border radiuses, colors, spacing, and typography across all components
   - Implement reusable design tokens for future scalability and consistency
   - Ensure the design system supports additional pages and features as the application grows

## 📁 Project Structure

```
studio-ghibli-project/
├── packages/
│   ├── backend/                 # GraphQL API server
│   │   ├── src/
│   │   │   ├── schemaModules/   # GraphQL schema definitions
│   │   │   ├── services/        # Business logic and API integration
│   │   │   └── tests/          # Backend tests
│   │   └── package.json
│   └── frontend/               # React application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── hooks/         # Custom React hooks
│       │   ├── modules/       # Feature modules
│       │   ├── graphql/       # GraphQL queries and generated types
│       │   └── shared/        # Shared utilities and contexts
│       └── package.json
├── tasks/                     # Development process documentation
│   ├── prd-studio-ghibli.md   # Product Requirements Document
│   └── tasks-prd-studio-ghibli.md # Task breakdown and completion
├── designs/                   # Design mockups and assets
└── README.md
```

---

**Built with ❤️ using React, GraphQL, and TypeScript**
