# Freya Web - Scalable React Foundation

This project is a scalable React application built with TypeScript, Vite, Bootstrap, and Material UI (MUI). It follows a modular architecture designed for high maintainability and clear separation of concerns.

## 🚀 Tech Stack
- **Framework:** [React 18+](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Frameworks:** [Material UI (MUI)](https://mui.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
- **Routing:** [React Router Dom](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 📂 Folder Architecture & Modules

The project is organized into specific modules to ensure a clean codebase as it grows:

### `src/assets`
Static assets used throughout the application.
- **What to put here:** Images (png, jpg), SVGs, Fonts, and Favicons.

### `src/components`
Purely reusable UI components that don't hold business logic.
- **What to put here:** Buttons, Input fields, Cards, Modals, Loaders, and Navigation bars.

### `src/context`
Global state management using the React Context API.
- **What to put here:** AuthContext (login/user state), ThemeContext (dark/light mode), and Global Settings.

### `src/errorBoundary`
Components that catch JavaScript errors anywhere in their child component tree.
- **What to put here:** Custom fallback UI components to show when the app crashes.

### `src/hooks`
Reusable side-effect logic extracted into custom React hooks.
- **What to put here:** `useFetch`, `useAuth`, `useLocalStorage`, `useDebounce`, etc.

### `src/pages`
Container components that represent full-screen views or routes.
- **What to put here:** Home, Dashboard, Profile, Login, and Settings pages.

### `src/services`
Logic for making network requests and interacting with external APIs.
- **What to put here:** Axios instance configuration, API endpoint definitions, and data fetching functions.

### `src/styles`
Global appearance and design system configurations.
- **What to put here:** Global CSS/SCSS, Color variables, Theme overrides for MUI, and Bootstrap customizations.

### `src/types`
Centralized TypeScript definitions.
- **What to put here:** Interfaces for API responses, User models, and shared Type aliases.

### `src/utils`
Pure helper functions and generic utilities.
- **What to put here:** Date formatters, currency converters, string manipulators, and validation logic.

---

## 🛠️ Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```
