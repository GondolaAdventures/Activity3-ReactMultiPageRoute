# Team Fortress Hospital - React Patient/Doctor App

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://articledemo-5edb7.web.app)

A hospital-themed React application featuring distinct Doctor and Patient workflows, Firebase integration for authentication and data storage, and a user-friendly interface with features like dark/light mode toggling.

![Team Fortress Hospital Poster](https://raw.githubusercontent.com/GondolaAdventures/Activity3-ReactMultiPageRoute/main/public/Team_Fortress_Hospital_Poster.jpg "Team Fortress Hospital")

## Key Features

*   **Role-Based Access**:
    *   **Doctors**: Log in with specific specialty emails (e.g., `@tf.doctor.cardio.com`). View patient posts relevant to their specialty, filter by status, reply, and mark concerns as resolved.
    *   **Patients**: Register/login with standard emails. Create, view, edit, and delete their own posts (concerns), selecting a relevant sickness category. Receive real-time updates on their posts.
*   **Firebase Backend**:
    *   **Authentication**: Secure user Sign Up, Log In, and Log Out using Firebase Authentication (Email/Password).
    *   **Firestore Database**: Real-time NoSQL database to store and sync patient posts, including content, category, status, creator info, and conversation threads.
*   **Dynamic UI**:
    *   **Theme Switching**: Toggle between Dark Mode and Light Mode using React Context API for a comfortable viewing experience.
    *   **Color-Coded Status**: Posts visually indicate their status ("resolved" in green, "unresolved" in red).
    *   **Responsive Filtering**: Doctors filter by status; Patients filter their own posts by category.
*   **Real-time Interaction**: Conversation threads allow asynchronous communication between patients and doctors on specific posts.

## Tech Stack

*   **Frontend**: React, React Router DOM, CSS, Web Vitals
*   **Backend**: Firebase (Authentication, Firestore)
*   **Tooling**: Create React App (React Scripts), Firebase CLI
*   **Deployment**: Firebase Hosting

## Live Demo

Experience the deployed application here: **[https://articledemo-5edb7.web.app](https://articledemo-5edb7.web.app)**

## Getting Started

Follow these steps to set up the project locally.

**Prerequisites:**

*   Node.js and npm (or yarn) installed.
*   Git installed.
*   A Firebase account.
*   Firebase CLI installed globally (see step 3 below).

**Installation & Setup:**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/GondolaAdventures/Activity3-ReactMultiPageRoute.git
    cd Activity3-ReactMultiPageRoute
    ```

2.  **Install Project Dependencies:**
    *(This single command installs all necessary packages listed in your `package.json`, including React, Router, Firebase, etc.)*
    ```bash
    npm install
    ```
    *Alternatively, or if needed, you can install specific core packages individually (though `npm install` is usually sufficient):*
    ```bash
    # Installs the scripts and configurations used by Create React App
    npm install react-scripts@latest
    # Installs the library for routing in React applications
    npm install react-router-dom
    # Installs a library for measuring web performance metrics
    npm install web-vitals
    # Installs the Firebase JavaScript SDK
    npm install firebase
    ```

3.  **Install Firebase CLI Globally:**
    *(This tool allows you to interact with your Firebase projects from the command line. The `-g` flag installs it globally on your system.)*
    ```bash
    npm install -g firebase-tools
    ```

4.  **Log in to Firebase:**
    *(Authenticates the Firebase CLI with your Firebase account.)*
    ```bash
    firebase login
    ```

5.  **Set Up Firebase Project Configuration:**
    *   Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Authentication** (choose the Email/Password sign-in method).
    *   Enable **Firestore Database** (start in test mode for development, remember to set up security rules for production).
    *   Go to Project Settings -> General -> Your apps -> Web app.
    *   Register a new web app and copy the `firebaseConfig` object.
    *   Create a file `src/firebase/config.js` (if it doesn't exist) and paste your config, exporting the necessary Firebase services:
        ```javascript
        // src/firebase/config.js
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';
        import { getAuth } from 'firebase/auth';

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Services
        const db = getFirestore(app);
        const auth = getAuth(app);

        export { db, auth };
        ```

6.  **Initialize Firebase in Your Local Project (Optional but Recommended for Deployment):**
    *(Links your local project directory to your Firebase project. Primarily needed for deployment.)*
    ```bash
    firebase init
    ```
    *   Follow the prompts. Choose "Hosting" when asked which features you want to set up. Select the Firebase project you created earlier. You can configure other settings like the public directory (usually `build`) and single-page app rewrites here if you plan to deploy using Firebase Hosting.

7.  **Run Locally:**
    ```bash
    npm start
    ```
    *   The application should open automatically in your browser at `http://localhost:3000`.

**Deployment (Firebase Hosting):**

*(Assumes you have already run `firebase login` and `firebase init hosting` as described in the setup steps)*

1.  **Build the React App for Production:**
    *(This creates an optimized `build` folder containing your static assets.)*
    ```bash
    npm run build
    ```

2.  **Deploy to Firebase Hosting:**
    ```bash
    firebase deploy
    ```
    *   The CLI will upload the contents of your `build` folder and provide you with the URL of your live site.

## Usage Overview

1.  **Landing Page**: Choose your role: **Doctor** or **Patient**.
2.  **Doctor Login**: Use a pre-approved specialty email (e.g., `doc@tf.doctor.cardio.com`). Access the Doctor Dashboard to view and manage patient concerns for that specialty.
3.  **Patient Login/Signup**: Register with any email address. Log in to access the Patient Home page.
4.  **Patient Home**: Create new posts (concerns) by providing details and selecting a category. View, edit, or delete your existing posts.
5.  **Post Details**: Click on a post card (from either dashboard) to view its full details and the conversation thread between the patient and doctor. Add replies if logged in.
6.  **Theme Toggle**: Use the button in the header to switch between light and dark modes.
7.  **Log Out**: Click the "Log Out" button to end your session and return to the landing page.

---

**Enjoy building and extending this hospital-themed React + Firebase app!**