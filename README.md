# Multipage React Site with Routing and Firebase Integration

## Overview

This repository contains a multipage React application built as a college activity. The application demonstrates:

- **Routing:** Implemented using `react-router-dom` v6 to navigate between pages.
- **Firebase Integration:** The app connects with Firebase Firestore, allowing users to create, edit, and delete articles.
- **Dynamic Pages:** Includes Home, About, Contact, and Article pages, with a dedicated 404 (NotFound) page for unmatched routes.
- **Responsive Design:** Clean and responsive styling with hover effects and a consistent layout.

## Features

- **Routing & Navigation:**
  - The Home page lists articles with links to view the full content.
  - The Article page uses URL parameters to display individual articles.
  - The About and Contact pages provide static and query-based content respectively.
  - A dedicated NotFound page handles unknown routes.

- **Firebase Integration:**
  - The application supports Firebase Firestore for creating, updating, and deleting articles.
  - This integration enables dynamic content management within the app.

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
5.  Install Additional Packages:
    Install additional dependencies:
    ```bash
    npm install react-router-dom
    npm install web-vitals
    ```
6.  Start the Development Server:
    Launch the application:
    ```bash
    npm start