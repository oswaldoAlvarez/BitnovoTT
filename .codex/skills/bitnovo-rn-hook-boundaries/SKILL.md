---
name: bitnovo-rn-hook-boundaries
description: Use when BitnovoTT component logic may need extraction into a reusable custom hook.
---

# Bitnovo RN Hook Boundaries

## Extract A Hook When

- A screen mixes rendering with API flow, timers, subscriptions, app state, or sockets.
- The same stateful workflow appears in more than one place.
- Derived flags or handlers make the render body hard to scan.
- A form or async flow has meaningful branching.

## Keep It Local When

- The logic is short, one-off, and clearer inline.
- The hook API would be larger than the component code it replaces.
- It only wraps trivial `useState` calls.

## Hook Rules

- Name hooks with `use...`.
- Give each hook one responsibility.
- Return a small API: state, derived flags, and commands.
- Keep JSX out of hooks.
- Move reusable pure helpers to feature/shared utils instead of keeping them inside component files.
- Test hooks that contain branching, async behavior, or side effects.
