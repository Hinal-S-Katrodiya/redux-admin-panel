Template: React Admin Dashboard
Project Overview
This project is a fully functional, responsive Admin Dashboard built with React. It demonstrates modern frontend development practices, including centralized state management, protected routing, and asynchronous API interactions for complete CRUD operations.

Key Features

User Authentication: Secure login and registration flows with protected routes. Unauthenticated users are redirected to the login screen.
Centralized State Management: Utilizes Redux Toolkit for efficient, scalable state handling across the application.
Full CRUD Functionality: Admins can Create, Read, Update, and Delete product records.
Form Validation & Safety: Includes robust input validation (e.g., preventing negative stock/prices) and edge-case handling for stateless mock APIs.
Responsive UI: Styled with Bootstrap for a clean, mobile-friendly, and professional data presentation, including dynamic UI badges for "Out of Stock" items.

Tech Stack

Framework: React (Bootstrapped with Vite)
State Management: Redux Toolkit (@reduxjs/toolkit, react-redux)
Routing: React Router v6
Styling: Bootstrap 5
HTTP Client: Axios
Backend/API: DummyJSON API

🔑 Test Credentials for Reviewers
This application is powered by the DummyJSON mock API. To test the protected dashboard, please use the following permanent test credentials:

Username: emilys
Password: emilyspass

Note regarding the Register feature: Because DummyJSON is a stateless mock API, new user registrations return a success response but do not persist in their database. The app correctly handles this by completing the Redux flow, alerting the user, and redirecting to the login page. Please use the hardcoded credentials above to access the dashboard.

Running the Project Locally
If you would like to run this repository on your local machine, run the following commands in your terminal:
# 1. Clone the repository
git clone https://github.com/Hinal-S-Katrodiya/redux-admin-panel.git

# 2. Navigate into the directory
cd redux-admin-panel

# 3. Install the dependencies
npm install

# 4. Start the Vite development server
npm run dev