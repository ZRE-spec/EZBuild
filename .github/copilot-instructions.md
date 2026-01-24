# EZBuild AI Coding Instructions

## Project Overview

**EZBuild** is a guided PC build assistant that generates personalized, step-by-step assembly instructions. Users select their platform (AMD/Intel), cooling type, and case configuration, then receive a tailored build guide.

**Stack**: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + React Router + React Query + Zod

## Architecture & Data Flow

### Pages (Routing)

- `/` → `Landing` (Hero + TerminalAnimation)
- `/build` → `BuildInput` (configuration form)
- `/guide` → `Guide` (step display with Hands-Busy mode)
- `*` → `NotFound`

### State Management Pattern

- **BuildInput → Guide**: Configuration stored in `sessionStorage` as `"buildConfig"`
- **No global state manager** - sessionStorage is the state bridge between pages
- Type: `BuildConfiguration` (platform, cooling, caseType)

### Component Structure

```
src/
  pages/          # Route components
  components/
    layout/       # Header + Layout wrapper
    landing/      # Hero, TerminalAnimation, About, FeatureCard
    build/        # ProgressIndicator, ComponentInput, BuildLoadingScreen
    guide/        # StepCard, HandsBusyMode
    ui/           # shadcn components (pre-built, don't modify)
  types/          # TypeScript interfaces
  data/           # generateMockSteps() for guide content
```

## Key Patterns

### 1. **TerminalAnimation** - Imperative Handle Component

The `TerminalAnimation` component uses `useImperativeHandle` to expose an `addLine()` method for parent-controlled typing effects:

```tsx
const terminalRef = useRef<TerminalAnimationHandle>(null);
// Later: terminalRef.current?.addLine("text", { highlight: true })
```

- Typewriter effect: 35ms per character
- Supports `highlight` and `success` flags for styling
- Prevents duplicate lines automatically
- Used in Hero to respond to hash navigation (#about)

### 2. **Session Storage for Cross-Page Data**

Store build config before navigation:

```tsx
sessionStorage.setItem("buildConfig", JSON.stringify(config));
navigate("/guide");
```

Retrieve in destination page:

```tsx
const stored = sessionStorage.getItem("buildConfig");
if (stored) setConfig(JSON.parse(stored));
```

### 3. **UI: Toggle-Based Configuration**

BuildInput uses `Toggle` and button-based selection patterns (not traditional forms):

- Mutually exclusive platforms (AMD/Intel): button groups
- Optional selections: `Toggle` components with state management
- All fields required before submit (button disabled until complete)

### 4. **HandsBusyMode Fullscreen Overlay**

Special read-only mode for hands-busy scenarios:

- Replaces entire Guide view (not a modal)
- Large touch-friendly step display
- Shows only current step (voice-navigation ready)
- Exit via toggle returns to normal Guide view

### 5. **Visual Theme & Styling**

- **Terminal aesthetic**: Glowing text, cyber-grid background, scanning effects
- **Tailwind extensions**: `text-glow-primary`, `text-success`, `border-glow`, `cyber-grid`
- **Animation**: `animate-fade-in`, `animate-scan`, `animate-blink` (defined in Tailwind config)
- **Colors**: Primary glows, muted-foreground for secondary text
- **Typography**: Monospace fonts throughout (`.font-mono`)

## Developer Workflows

### Local Development

```bash
bun install
bun run dev         # Start Vite dev server (port 5173 default)
bun run build       # Production build
bun run test        # Run Vitest
bun run test:watch  # Watch mode
bun run lint        # ESLint
```

### Critical Commands

- **Never commit unbuilt** - run `bun build` before production
- **Linting required** - `bun run lint` must pass (ESLint config enforced)
- **No database/API** - all data is mock (mockGuide.ts) or sessionStorage

## Integration Points & Dependencies

### External Libraries (Don't Replace)

- **shadcn/ui**: Pre-built accessible components in `src/components/ui/` - import as-is, never modify
- **Recharts**: Chart library (imported but unused - for future dashboard)
- **Sonner + React Toaster**: Toast notification system (set up in App.tsx providers)
- **React Query**: Query client initialized in App.tsx (unused but structured for future API integration)
- **Zod**: Type validation available via schema definitions (unused but imported in form setup)

### QueryClientProvider & Providers

All providers wrapped in App.tsx:

```tsx
QueryClientProvider → TooltipProvider → Toaster/Sonner → BrowserRouter → Routes
```

Add new providers **inside** QueryClientProvider to maintain hierarchy.

## Conventions & Patterns to Follow

### Naming

- **Pages**: PascalCase, suffix files with `.tsx` (e.g., `BuildInput.tsx`)
- **Components**: PascalCase, group by feature folder
- **Types**: Keep in `src/types/`, export interfaces for cross-component use
- **Mock data**: Generate via functions like `generateMockSteps()`, export from `src/data/`

### Component Patterns

- Use `forwardRef` for parent-controlled behavior (see TerminalAnimation)
- Destructure props with typed interfaces
- Use `useNavigate()` for programmatic routing (not `<Link>` for logic-heavy transitions)
- Prefer composition over conditional renders when possible

### Styling

- Tailwind-first: use utility classes, avoid inline styles
- Reference `tailwind.config.ts` for custom colors/animations
- Terminal theme: pair `text-primary` with `text-glow-primary` for emphasis
- Responsive: mobile-first, use `sm:`, `lg:` breakpoints

### Testing

- Tests in `src/test/` directory
- Use Vitest (ESM-compatible)
- Example: `src/test/example.test.ts` - pattern to follow

## Files to Review for Context

- [src/App.tsx](src/App.tsx) - Provider setup, routing structure
- [src/pages/BuildInput.tsx](src/pages/BuildInput.tsx) - Toggle/configuration pattern
- [src/pages/Guide.tsx](src/pages/Guide.tsx) - SessionStorage retrieval, HandsBusyMode integration
- [src/components/landing/TerminalAnimation.tsx](src/components/landing/TerminalAnimation.tsx) - Imperative handle pattern
- [src/data/mockGuide.ts](src/data/mockGuide.ts) - BuildStep mock data structure
- [src/types/build.ts](src/types/build.ts) - Core type definitions

## Known Limitations & Future Hooks

- **No real API**: All data is mocked - replace `generateMockSteps()` when backend is ready
- **No persistence**: Config data only lives in sessionStorage (clear on page refresh)
- **Save/Export disabled**: Buttons exist but are placeholder (`.disabled` state)
- **Mobile-responsive**: Framework exists, but test on mobile before deploy
