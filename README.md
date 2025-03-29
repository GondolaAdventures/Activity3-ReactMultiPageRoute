# Team Fortress Hospital - A Hospital-Themed React App

This repository contains a hospital-themed React application featuring **Doctor** and **Patient** workflows, Firebase integration, and enhanced UI/UX elements such as **dark mode**. Users can authenticate (sign up, log in, log out), create and view patient concerns, and filter or update their posts based on status and sickness category.

## Key Features

1. **Doctor/Patient Workflows**  
   - **Doctor Role**: Logs in using a special `@tf.doctor.com` email domain. Can view all patient posts, filter by category/status, reply to patient concerns, and mark them as resolved.  
   - **Patient Role**: Can register and log in with any email. Creates new posts (concerns) tied to a sickness category, can edit/delete their own posts, and sees real-time updates when doctors reply or mark concerns resolved.

2. **Dark Mode / Light Mode**  
   - **Toggle** between light and dark themes globally, using a custom `ThemeContext`.

3. **Firebase Integration**  
   - **Authentication**: Sign up, log in, and log out with Firebase Auth.  
   - **Firestore**: Stores posts (concerns) with fields for category, status, createdBy, doctor/patient replies, etc.

4. **Log Out Functionality**  
   - Users can log out, clearing their session and returning them to the landing page.

5. **Color-Coded Status**  
   - Posts with a “resolved” status appear in green; “unresolved” in red for quick visual distinction.

6. **Filtering & Sorting**  
   - Doctors can filter posts by sickness category and resolution status.  
   - Patients can filter their own posts by category, easily finding specific concerns.

## Project Structure
- **Landing Page**: Prompt to choose Doctor or Patient role.
- **Doctor Login**: Allows only `@tf.doctor.com` addresses.
- **Patient Login & Signup**: Allows standard email addresses, sign-up includes sickness category selection.
- **Doctor Dashboard**: View and filter all patient posts; mark as resolved; reply to concerns.
- **Patient Home**: Manage own posts, create or edit concerns, see real-time updates when doctors reply.
- **Post Details**: Displays individual post info and conversation thread between patient and doctor.
- **ThemeContext**: Provides global dark/light mode state.

## Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/GondolaAdventures/Activity3-ReactMultiPageRoute.git
   ```
2. **Install Dependencies**
   ```bash
   cd Activity3-ReactMultiPageRoute
   npm install
   ```
3. **Set Up Firebase**  
   - Create a new Firebase project.  
   - Copy your Firebase config into a `firebase/config.js` file.  
   - Enable Authentication (Email/Password) and Firestore in the Firebase console.
4. **Run Locally**
   ```bash
   npm start
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
5. **Build & Deploy**  
   ```bash
   npm run build
   firebase deploy
   ```
   - Update your Firebase configuration if you plan to use Firebase Hosting.

## Usage Overview

- **Landing Page**: Choose **Doctor** or **Patient**.  
- **Doctor Login**: Enter an `@tf.doctor.com` email. Then access the **Doctor Dashboard**, where all concerns are visible.  
- **Patient Login/Signup**: Register with a normal email, choose your **sickness category**, then create or manage your posts via **Patient Home**.  
- **Create/Edit Post**: Patients can create new concerns or edit existing ones.  
- **Dark Mode Toggle**: Switch the entire site theme to light or dark at the top of the page or a designated toggle button.  
- **Log Out**: Ends the user session, returning to the landing page.

**Enjoy building and extending this hospital-themed React + Firebase app!**
