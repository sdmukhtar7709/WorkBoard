# WorkBoard Project Overview

## Project Overview
WorkBoard is a production-oriented platform for organizing jobs, tracking categories, and managing professional profile data in a clean web interface. The current focus is the frontend foundation, with the backend and database planned as later phases.

## Vision
Build a reliable, modular, and scalable work management product that can grow from a simple job tracking experience into a broader productivity platform with backend services, analytics, and AI-assisted workflows.

## Goals
- Deliver a clean and maintainable frontend architecture.
- Keep user-facing screens simple, fast, and responsive.
- Establish consistent conventions before backend development begins.
- Support future expansion into authentication, APIs, persistence, and AI features.

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Node.js for future backend services
- Express for future API development
- PostgreSQL for future persistence

## Folder Structure
```text
src/
├── assets
├── components
│   ├── common
│   ├── layout
│   └── ui
├── context
├── hooks
├── routes
├── services
├── types
├── utils
├── pages
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Jobs
│   ├── Categories
│   └── Profile
├── App.tsx
├── main.tsx
└── index.css
```

## Coding Standards
- Use TypeScript for all application logic and component interfaces.
- Keep components focused on a single responsibility.
- Prefer reusable UI primitives over duplicated markup.
- Keep naming clear, consistent, and descriptive.
- Avoid business logic inside presentation-only components.
- Use Tailwind utility classes for styling instead of custom CSS unless a global rule is required.

## Naming Conventions
- Components use PascalCase.
- Hooks use the `use` prefix.
- Page folders match route intent, such as `Login` and `Dashboard`.
- Shared utilities use camelCase filenames where appropriate.
- Types should be named for the domain concept they represent.

## Development Principles
- Build modular features that can scale independently.
- Favor composition over deep component inheritance.
- Keep the UI responsive and accessible by default.
- Preserve a clear separation between layout, presentation, and future data access.
- Introduce complexity only when a real use case requires it.