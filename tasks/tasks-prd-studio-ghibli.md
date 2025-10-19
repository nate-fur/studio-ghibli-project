# Tasks: Studio Ghibli Film Cards Application

## Relevant Files

- `packages/frontend/src/modules/home/Home.tsx` - Main component containing the film cards interface
- `packages/frontend/src/modules/home/Home.test.tsx` - Unit tests for Home component
- `packages/frontend/src/graphql/queries/films.ts` - GraphQL queries for fetching film data
- `packages/frontend/src/components/FilmCard.tsx` - Interactive film card component with event handlers and flip animation
- `packages/frontend/src/components/FilmCard.test.tsx` - Unit tests for FilmCard component
- `packages/frontend/src/components/LoadingSpinner.tsx` - Loading spinner component for card states
- `packages/frontend/src/components/LoadingSpinner.test.tsx` - Unit tests for LoadingSpinner component
- `packages/frontend/src/styles/components/card.ts` - Card-specific styling and animations
- `packages/frontend/src/styles/components/button.ts` - Button styling for film selection
- `packages/frontend/src/hooks/useFilmData.ts` - Custom hook for managing film data fetching
- `packages/frontend/src/hooks/useFilmData.test.ts` - Unit tests for useFilmData hook
- `packages/backend/src/schemaModules/ghibli/queries.ghibliSchema.ts` - Backend GraphQL queries for films (film query with ID parameter)
- `packages/backend/src/services/StudioGhibli/StudioGhibli.service.ts` - Service for fetching films from Studio Ghibli API
- `packages/backend/src/services/StudioGhibli/StudioGhibli.service.unit.test.ts` - Unit tests for StudioGhibliService
- `packages/backend/src/services/StudioGhibli/StudioGhibli.service.integration.test.ts` - Integration tests for StudioGhibliService
- `packages/backend/src/tests/filmQueries.test.ts` - Integration tests for GraphQL film queries
- `packages/backend/src/schemaModules/ghibli/objectTypes.ghibliSchema.ts` - GraphQL type definitions for films (Film object type with all Studio Ghibli API fields)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set up server-side GraphQL queries to connect and fetch films from the Studio Ghibli API
  - [x] 1.1 Create GraphQL type definitions for Film objects in `objectTypes.ghibliSchema.ts`
  - [x] 1.2 Implement GraphQL queries to fetch individual films by ID in `queries.ghibliSchema.ts`
  - [x] 1.3 Generate the GraphQL schema using Nexus GraphQL
  - [x] 1.4 Create a new StudioGhibliService that uses the existing HttpService to handle Studio Ghibli API endpoints (https://ghibliapi.vercel.app/ - see Films documentation at https://ghibliapi.vercel.app/#tag/Films)
  - [x] 1.5 Add error handling for API failures and network issues
  - [x] 1.6 Write automated tests for GraphQL queries and ensure they pass
- [ ] 2.0 Create the main page layout and film cards interface with responsive design for mobile
  - [ ] 2.1 Create the main Home component with light blue sky background
  - [ ] 2.2 Add primary header "Discover Studio Ghibli Films" and subheader "Select a film and hover to learn more"
  - [ ] 2.3 Create interactive FilmCard component with specified colors (Totoro: #d79a68, Spirited Away: #c24646, Mononoke: #279094, Howl's: #3e6cac), white text titles, right arrow buttons, and event handlers for onClick and onHover
  - [ ] 2.4 Implement responsive grid layout that reorganizes into single column on mobile (< 768px)
  - [ ] 2.5 Ensure proper styling and spacing matches the design mockups
- [ ] 3.0 Set up frontend GraphQL integration and data fetching
  - [ ] 3.1 Configure GraphQL Code Generator to generate typed hooks
  - [ ] 3.2 Create GraphQL queries for fetching film data by ID
  - [ ] 3.3 Set up Apollo Client with useLazyQuery for on-demand data fetching
  - [ ] 3.4 Create custom hook `useFilmData` to manage film data state
  - [ ] 3.5 Connect the `useFilmData` hook to the FilmCard onClick events and pass the proper film data to each card
  - [ ] 3.6 Test data fetching with the four target film IDs from the PRD
- [ ] 4.0 Add loading states and user feedback
  - [ ] 4.1 Create LoadingSpinner component for arrow button loading states
  - [ ] 4.2 Add loading spinner to right arrow button when film data is being fetched (using useLazyQuery loading state)
  - [ ] 4.3 Implement fade transition when loading completes and film data is displayed
  - [ ] 4.4 Add error handling and user feedback for failed API calls
  - [ ] 4.5 Test loading states with slow network simulation
- [ ] 5.0 Implement film card flip animations and data display
  - [ ] 5.1 Implement CSS flip animation using transforms for smooth 60fps transitions
  - [ ] 5.2 Add hover interactions for desktop (flip on hover, flip back on hover end)
  - [ ] 5.3 Add tap interactions for mobile (flip on tap, flip back on second tap)
  - [ ] 5.4 Display movie poster and title on card front when data is loaded
  - [ ] 5.5 Display movie banner, description, director, release date, runtime, and Rotten Tomatoes score on card back
  - [ ] 5.6 Ensure cards work properly in both loaded and unloaded states
  - [ ] 5.7 Test animations on both desktop and mobile devices
