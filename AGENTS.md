# Project Guidelines

## Stack and Structure

- This is a Vite 6 + React 19 app using plain JSX and ESM; do not introduce TypeScript, a router, a state library, or backend calls without a specific requirement.
- `src/main.jsx` mounts `src/App.jsx`. Put reusable UI in `src/components/` and route-level screens in `src/pages/`.
- Authentication screens live in `src/pages/Auth/`; `src/components/Form.jsx` currently composes the login/register flow.
- Keep CSS co-located with components and pages. Use the existing plain global CSS style and kebab-case class names; global resets belong in `src/App.css` or `src/index.css`.

## Commands

- Install dependencies with `npm install`.
- Run the app with `npm run dev` and create a production build with `npm run build`.
- Run the test suite with `npm test` (`vitest run`).
- Run lint with `npm run lint` (`eslint .`). The current baseline has three known lint errors in `src/App.jsx` and `src/components/Header/Header.jsx`; do not broaden unrelated cleanup into feature work.

## Testing

- Keep tests in the top-level `tests/` directory and use Vitest with jsdom, Testing Library, and `userEvent`.
- Prefer accessible queries such as `getByLabelText` and `getByRole`; follow `tests/auth.test.jsx` and the accessible label pattern in `src/pages/Auth/Register.jsx`.
- Forms are controlled with React state and currently log submission data rather than calling an API. Preserve exact log messages when tests depend on them, and mock `alert` in jsdom-based Login tests.
- Empty test bodies can pass vacuously; when touching a placeholder test, implement assertions for the intended behavior.

## Change Discipline

- Follow the existing component and stylesheet boundaries before adding abstractions.
- Run the narrowest relevant test first, then `npm test`, `npm run lint`, and `npm run build` when the change affects those checks.
- Do not modify customization files or unrelated baseline issues while implementing a product task unless explicitly requested.
