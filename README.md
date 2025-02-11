# Multipage React Site with Routing, Dark Mode, and Online Images

## Overview

This repository contains a multipage React application built as a college project. The application demonstrates:
- **Routing:** Implemented using `react-router-dom` v6 to navigate between pages.
- **Data Handling:** A custom hook (`useFetch.js`) for fetching data asynchronously.
- **Dynamic Pages:** Includes Home, About, Contact, and Article pages, with a dedicated 404 (NotFound) page for unmatched routes.
- **Dark Mode/Light Mode Toggle:** Users can switch between dark and light themes.
- **Online Images:** The Home page displays a dynamically loaded image from Unsplash.
- **Responsive Design:** Clean and responsive styling with hover effects and a consistent layout.

## Features

- **Routing & Navigation:**
  - The Home page lists articles with links to the full content.
  - The Article page uses URL parameters to display individual articles.
  - The About and Contact pages provide static and query-based content respectively.
  - A dedicated NotFound page handles unknown routes.
  
- **Dark Mode Toggle:**
  - A button in the global navigation toggles dark mode on and off.
  - Dark mode is implemented by adding a CSS class to the document body.
  
- **Online Images:**
  - The Home page includes an image fetched from Unsplash.
  
- **Custom Hooks:**
  - The `useFetch` hook encapsulates logic for asynchronous data fetching.

## Installation and Setup

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**  
   Open your terminal and run:
   ```bash
   git clone https://github.com/GondolaAdventures/Activity3-ReactMultiPageRoute.git
2. **Change Directory:**
    Navigate to the cloned repository:
    ```bash
    cd Activity3-ReactMultiPageRoute
3. **Install Dependencies:**
    Install the required packages:
    ```bash
    npm install
4.  **Update React Scripts:**
    Install the latest version of react-scripts to ensure compatibility:
    ```bash
    npm install react-scripts@latest
5.  Start the Development Server:
    Launch the application:
   ```bash
    npm start