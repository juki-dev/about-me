---
inclusion: always
---

# Tech Stack

## Core Technologies

- Vue 3.4+ with Composition API (script setup syntax)
- TypeScript 5.4
- Vue Router 4.3 for navigation
- Vite 5.2 as build tool and dev server

## Development Tools

- ESLint with Vue 3 essential rules and TypeScript support
- vue-tsc for TypeScript type checking in Vue files
- Node 20+ runtime

## Common Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production (includes type checking)
npm run build

# Type check only
npm run type-check

# Lint and auto-fix code
npm run lint

# Preview production build
npm run preview
```

## Path Aliases

- `@/` maps to `src/` directory (configured in vite.config.ts)
