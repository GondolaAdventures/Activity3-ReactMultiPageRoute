# Multipage React Site with Routing, Firebase Integration, and Authentication

This repository contains a multipage React application demonstrating routing, Firebase integration, and basic authentication (including Log-In and Sign-Up pages).

## Overview

- **Routing**: Implemented using `react-router-dom` v6 for smooth navigation.
- **Firebase**: Uses Firebase Firestore for data management and Firebase Hosting for deployment.
- **Authentication**: Includes a Log-In and Sign-Up page to handle basic user registration and access.
- **Live Demo**: Visit [https://articledemo-5edb7.web.app](https://articledemo-5edb7.web.app) to see the deployed site.

## Features

1. **Multiple Pages**  
   - Home, About, Contact, Article pages, and a 404 NotFound page for unmatched routes.
2. **Firebase Firestore**  
   - Create, edit, and delete articles. Real-time updates thanks to Firestore’s listener.
3. **User Authentication**  
   - Log-In and Sign-Up pages for basic user credential handling.
4. **Responsive Design**  
   - Modern styling with hover effects, consistent layout, and adaptability across devices.

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/GondolaAdventures/Activity3-ReactMultiPageRoute.git
   ```
   *(Replace with your actual repository URL.)*

2. **Navigate into the Project Directory**

   ```bash
   cd YourRepoName
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Install React Router, Firebase Tools, and Related Packages**  
   - **React Router DOM** is likely installed already, but if needed:
     ```bash
     npm install react-router-dom
     ```
   - **Firebase** for Firestore and authentication:
     ```bash
     npm install firebase
     ```
   - **Firebase Tools (CLI) globally** to deploy and manage Firebase:
     ```bash
     npm install -g firebase-tools
     ```

5. **Firebase Setup**  
   - **Log in** to Firebase in your terminal:
     ```bash
     firebase login
     ```
   - **Initialize** Firebase in your project (choose Firestore, Hosting, etc. as needed):
     ```bash
     firebase init
     ```
   - **Deploy Firestore Rules** only (if you have custom security rules):
     ```bash
     firebase deploy --only firestore:rules
     ```

6. **Run the App Locally**

   ```bash
   npm start
   ```
   This starts the development server at [http://localhost:3000](http://localhost:3000).

7. **Build and Deploy**

   - **Create a Production Build**:
     ```bash
     npm run build
     ```
   - **Deploy to Firebase**:
     ```bash
     firebase deploy
     ```
   This will upload your build folder to Firebase Hosting. Your live URL should appear in the terminal or Firebase console.

## Usage

- **Home Page**: Displays a list of articles (or a welcome message).  
- **Log-In / Sign-Up**: Allows users to register or sign into the application.  
- **Article Creation/Management**: If implemented, users can create, edit, or remove articles.  
- **Contact / About**: Example static pages showcasing routing.  
- **404 NotFound**: Displays a custom message for invalid routes.

## Contributing

Contributions and feedback are welcome! Feel free to submit issues or pull requests.

**Happy coding!** 🚀
