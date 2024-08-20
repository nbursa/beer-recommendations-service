# Beer Recommendations Service

This repository contains the frontend implementation for the Craft Beer Emporium's Beer Recommendations Service.

## Overview

The application is a single-page React.js application that displays and manages a catalog of beers. The UI allows users to browse beers, view detailed information about each beer, and manage the beer inventory.

### Key Features

- **Landing Page**: Displays a grid of beers, sortable and filterable by brand, style, ABV, and price. Users can make a purchase directly from this page.
- **Beer Details View**: Provides detailed information about a selected beer and allows for a purchase.
- **Management View**: Displays a chart showing sales data for the top 10 sold beer brands and allows inventory management.

## Tech Stack

- **React.js**: Main library for building the user interface.
- **Zustand**: State management library used for managing global state.
- **React Testing Library**: Used for testing components.
- **Chart.js & react-chartjs-2**: Used for rendering charts in the Management View.
- **Vite**: Build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Project Setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nbursa/beer-recommendations-service.git
   cd beer-recommendations-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**: Start the Vite development server.

  ```bash
  npm run dev
  ```

- **Build for Production**: Build the application for production.

  ```bash
  npm run build
  ```

- **Preview Production Build**: Preview the production build locally.
  ```bash
  npm run preview
  ```

### Running Tests

- **Run Unit Tests**: Execute unit tests using Vitest.
  ```bash
  npm run test
  ```

