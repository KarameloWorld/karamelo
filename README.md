# Karamelo Front - React + TypeScript + Vite

This is a karaoke application built with React, TypeScript, and Vite. It includes a comprehensive testing setup with Vitest for unit tests and Playwright for end-to-end testing.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 🎭 **Playwright** - Reliable end-to-end testing
- 📏 **ESLint & Prettier** - Code linting and formatting
- 🐕 **Husky** - Git hooks for code quality

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## Testing

This project includes a comprehensive testing setup. See [TESTING.md](./TESTING.md) for detailed information about:

- Unit and component testing with Vitest
- End-to-end testing with Playwright
- Testing best practices and examples
- CI/CD integration

### Available Test Commands

```bash
# Unit tests
pnpm test              # Run in watch mode
pnpm test:run          # Run once
pnpm test:ui           # Run with UI
pnpm test:coverage     # Run with coverage

# E2E tests
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # Run with Playwright UI
pnpm test:e2e:headed   # Run in headed mode
```

## Development

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.mjs
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
