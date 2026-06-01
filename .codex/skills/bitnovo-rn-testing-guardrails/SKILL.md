---
name: bitnovo-rn-testing-guardrails
description: Use when adding or changing BitnovoTT behavior that needs Jest unit tests or React Native Testing Library screen tests.
---

# Bitnovo RN Testing Guardrails

## Required Coverage

- Add/update unit tests for API payload builders, validators, mappers, hooks, and business logic.
- Add/update React Native Testing Library tests for new or changed screens.
- Do not postpone tests unless the user explicitly accepts that tradeoff.

## Test Style

- Use Jest with `jest-expo`.
- Use React Native Testing Library for components and screens.
- Assert user-visible behavior, outputs, and side effects.
- Mock boundaries: network, router, storage, native modules, time.
- Avoid snapshot-only tests and private implementation details.

## Minimum Bar

- Important logic: happy path plus one realistic edge/failure case.
- New screen: critical UI renders plus primary user path when interactive.
- Run `npm run quality` before finishing.
