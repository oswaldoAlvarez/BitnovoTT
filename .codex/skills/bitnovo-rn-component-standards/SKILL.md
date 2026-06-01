---
name: bitnovo-rn-component-standards
description: Use when creating or refactoring React Native UI components or screens in BitnovoTT.
---

# Bitnovo RN Component Standards

## Rules

- Prefer arrow functions for components, handlers, helpers, and render callbacks.
- Avoid inline styles, `StyleSheet.create`, and inline functions in JSX.
- Use NativeWind classes for styling.
- Use the shared NativeWind palette; do not scatter raw hex colors through JSX.
- Prefer Tailwind scale tokens and semantic theme tokens over arbitrary `[...]` values.
- Use arbitrary pixel values only when the design truly requires a non-scale value and no semantic token exists yet.
- Prefer existing shared UI primitives before repeating raw native components.
- Do not define extra React components inside screen files; move them to feature/shared component files.
- Wrap repeated native controls in focused reusable components.
- Keep route files thin; screens live in `src/features/<feature>/screens`.
- Keep business logic, network calls, storage, and sockets out of presentational components.
- Use descriptive domain names.
- Prefer explicit props and composition over generic config objects or boolean-heavy APIs.
- Apply SOLID pragmatically: one responsibility, explicit dependencies, split components when responsibilities diverge.

## Reuse

- Reuse nearby components first.
- Create shared components only when reuse is real or clearly imminent.
- Keep one-off pieces inside the feature/screen instead of forcing them into `shared`.
- Accept small local repetition when abstraction would hide intent.

## Final Check

- No inline styles.
- No avoidable arbitrary `px` classes when a scale/token alternative exists.
- No unnecessary raw base components.
- Names are searchable and specific.
- Component API is simpler than the duplicated alternative.
