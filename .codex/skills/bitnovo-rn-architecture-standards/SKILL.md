---
name: bitnovo-rn-architecture-standards
description: Use when changing BitnovoTT project structure, Expo Router routes, feature slices, imports, app wrappers, NativeWind setup, or Expo configuration.
---

# Bitnovo RN Architecture Standards

## Structure

- Use Expo Router file routes under `app/`; route files should only render feature screens.
- Put product use cases in `src/features/<feature>/`.
- Put reusable UI, hooks, API primitives, and constants in `src/shared/`.
- Put app-level providers, navigation setup, safe-area wrappers, and devtools in `src/core/`.
- Prefer `@/...` aliases over long relative imports.

## Expo

- Read Expo SDK 55 docs before changing Expo config, Router, native config, Metro, or build behavior.
- Use Expo Router typed routes with literal paths. Do not duplicate paths in route constants.
- Prefer explicit object/type annotations over `as const` or `satisfies` when readability is better for this project.
- Do not add public/private route groups unless auth/session exists.
- Remove deprecated props/settings when touched; do not leave deprecated config in repo files.
- Use `react-native-safe-area-context`, not `SafeAreaView` from `react-native`.
- Screen wrappers should handle safe area and keyboard avoidance consistently.

## Styling And Tooling

- NativeWind is the styling standard.
- Reactotron is dev-only diagnostics.
- Keep `AGENTS.md` if it documents required agent behavior for this repo.
