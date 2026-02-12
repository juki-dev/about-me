---
inclusion: always
---

# Project Structure

## Directory Organization

```
src/
├── assets/          # Static assets (CSS, images, logos)
│   ├── img/        # Image files
│   ├── base.css    # Base styles
│   └── main.css    # Main stylesheet
├── components/      # Vue components
│   ├── core/       # Reusable core components (CardSection, GridLayout, etc.)
│   └── sections/   # Page section components organized by feature
│       ├── education/
│       ├── events/
│       └── experience/
├── router/          # Vue Router configuration
├── views/           # Top-level view components
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## Component Organization

- Core reusable components go in `components/core/`
- Feature-specific sections go in `components/sections/` with subdirectories by feature area
- Top-level menu components (AboutMenu, ContactMenu) live directly in `components/`
- Page views that use router go in `views/`

## Naming Conventions

- Vue components use PascalCase (e.g., `CardSection.vue`, `AboutMenu.vue`)
- Component imports may use `Vue` suffix (e.g., `AboutMenuVue`)
- CSS classes use kebab-case with BEM-like naming (e.g., `card-section_title`)

## Component Style

- Use `<script setup lang="ts">` for Composition API
- Props defined with `defineProps()`
- Scoped styles preferred, but some components use global styles
- CSS custom properties used for theming (e.g., `var(--main-color)`)
