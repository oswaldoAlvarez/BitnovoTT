---
name: bitnovo-rn-api-standards
description: Use when adding or changing BitnovoTT API endpoints, HTTP client behavior, payload types, env config, errors, or network diagnostics.
---

# Bitnovo RN API Standards

## HTTP

- Use the shared HTTP client for Bitnovo requests.
- The HTTP client owns `baseUrl`, timeout, JSON/FormData handling, and common headers.
- Keep endpoint paths in `src/shared/api/endpoints.ts`.
- Use env config for base URL and device ID.

## Feature APIs

- Keep feature API modules thin: endpoint, payload type, response type, one exported operation.
- Use custom React Query hooks for server state.
- Prefer raw API responses. Add adapters only when a consumed endpoint requires one.

## Errors

- `ApiError` represents transport/API failures; it is not a React Error Boundary.
- Preserve `status`, `message`, and server `payload` when available.
- UI error boundaries are separate from HTTP error classes.
