# Task Timer Pro

A modern to-do list application where each task has its own individual stopwatch timer to track time spent. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Add, Toggle, and Delete Tasks:** Manage your to-do list with ease.
- **Individual Timers:** Each task has its own start, pause, and reset timer.
- **Responsive Design:** A clean and intuitive interface that works on all screen sizes.
- **Clean Codebase:** Refactored for better organization and maintainability.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Installation & Running

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Project Structure

The main application code is located in the `/src` directory.

-   `/src/components`: Reusable React components.
    -   `/src/components/icons`: SVG icon components.
-   `/src/hooks`: Custom React hooks (e.g., `useTimer`).
-   `/src/types.ts`: TypeScript type definitions.
-   `/src/App.tsx`: The main application component.
-   `/src/main.tsx`: The entry point of the React application.
