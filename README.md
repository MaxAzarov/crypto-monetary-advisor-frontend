# React + TypeScript + Vite Project

Frontend part of crypto monetary advisor

## Node.js Version

This application requires **Node.js version 20.16.0** to run. Ensure you have this version installed for optimal compatibility.

---

## Environment Configuration

The application uses an .env file to manage environment-specific configurations.

You can find an example of this configuration in .env.example.
To set up your environment, copy .env.example to .env and fill in the required values before running the application.

```bash
$ cp .env.example .env
```

## Project setup

```bash
$ npm install
```

```bash
npm run dev
```

The application will run at http://localhost:5173 by default.

Project Scripts
Development: Start the development server with hot reloading.

```bash
npm run dev
```

Build: Create a production-ready build of the application.

```bash
npm run build
```

Preview: Serve the production build locally for testing.

```bash
npm run preview
```

Lint: Run ESLint to analyze and fix code quality issues.

```bash
npm run lint
```

Type Check: Check for TypeScript type errors.

```bash
npm run type-check
```

Project Structure

```bash

📦 Project Root
├── 📂 public # Stores static files like images, icons, fonts.
├── 📂 src # Main application code.
│ ├── 📂 api # API interaction logic (e.g., axios configurations).
│ │ ├── 📂 backend # Backend API endpoints.
│ │ ├── 📂 coingecko # Coingecko API endpoints.
│ │ ├── 📂 auth # Authentication-related endpoints.
│ ├── 📂 components # Reusable UI components.
│ ├── 📂 constants # Application-wide constants.
│ ├── 📂 contracts # Token contract configurations.
│ ├── 📂 emitters # Event emitters for inter-component communication.
│ ├── 📂 features # Functional modules organized by pages/features.
│ ├── 📂 helpers # Utility functions for integrations.
│ ├── 📂 hooks # Custom React hooks.
│ ├── 📂 modals # Modal components used across the application.
│ ├── 📂 routing # Application navigation and guards.
│ │ ├── ProtectedRoute.tsx # Route guard for authenticated users.
│ ├── 📂 services # Local storage services for API tokens.
│ ├── 📂 sockets # WebSocket configurations for real-time data.
│ ├── 📂 theme # Global theme configurations using Material UI.
├── 📂 node_modules # Installed dependencies (auto-generated).
├── .env # Environment variables.
├── .env.example # Template for required environment variables.
├── .gitignore # Ignored files for Git version control.
├── eslint.config.js # ESLint configuration for code quality.
├── index.html # Main entry point for the application.
├── package.json # Project metadata and dependencies.
├── package-lock.json # Locked versions of dependencies.
├── README.md # Documentation for the project.
├── tsconfig.app.json # Additional TypeScript configuration for the app.
├── tsconfig.json # Main TypeScript configuration.
├── tsconfig.node.json # TypeScript configuration for server-side code.
└── vite.config.js # Vite configuration file.
```

Features and Highlights
Vite: Fast and lightweight development server and build tool.
React + TypeScript: A robust setup with type safety and modern React features.
Material UI: Predefined themes and design system for consistent UI/UX.
WebSockets: Real-time data fetching with sockets integration.
API Services: Modular API interaction logic with structured Axios configurations.
Build and Deployment
Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
