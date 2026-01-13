### **Prerequisites**

* Node.js (v18.x or higher recommended)
* npm (v8.x or higher) or Yarn (v1.x or higher)
* MongoDB (Community Server for local, or a MongoDB Atlas account for cloud)
* Git
* after getting into main folder go to frontend folder and run "npm install" to haveall fdependecies (incase if it won't work)
  

@Management_System

Management System is a web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, designed to showcase robust user authentication, dynamic content display, secure file management, and insightful user-specific data tracking. This project is optimized for performance, scalability, and maintainability, providing a solid foundation for enterprise-level applications.

---

 ✨ Features

User Authentication & Authorization:** Secure user registration (`/signup`) and login (`/login`) with JSON Web Tokens (JWT) for session management. Role-based access control (Admin/User).
* **Protected Routes:** Client-side route protection using `react-router-dom`'s `ProtectedRoute` pattern, ensuring only authenticated users can access specific pages (e.g., `/Userp`, `/Admin`, `/Workupdate`). Prevents back-button access after logout.
* **Dynamic User Dashboard (`/Userp`):** A personalized dashboard displaying a welcome message, navigation links, and dynamic statistics.
* **Work Submission / File Upload (`/Workupdate`):** Dedicated interface for users to securely upload files (PDF, DOCX, PPTX) to the backend.
 **Secure Backend API:** RESTful API built with Node.js and Express.js, protected by JWT authentication middleware.
* **Responsive UI:** Developed with Tailwind CSS for a modern, utility-first approach to styling and responsiveness.
* **Smooth Animations:** Utilizes Framer Motion for elegant UI animations (e.g., sidebar transitions, element entrances).
* **Real-time Logging (Backend):** Uses Morgan for HTTP request logging on the server.
* **AI Assistance:** (An integrated AI chat endpoint  API integration and content generation Whatever asked by user  with safety settings.

---
 🛠️ **Tech Stack**

Frontend:
* **React.js:** JavaScript library for building user interfaces.
* **React Router DOM:** For client-side routing.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Framer Motion:** A production-ready motion library for React.
* **Axios / Fetch API:** For making HTTP requests to the backend.
* **`dotenv` (for client):** For managing environment variables (e.g., `REACT_APP_API_URL`).

**Backend:**
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** NoSQL database for flexible data storage.
* **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
* **JSON Web Tokens (JWT):** For secure, stateless authentication.
* **Bcrypt.js:** For password hashing.
* **Multer:** Node.js middleware for handling `multipart/form-data` (primarily for file uploads).
* **CORS:** Node.js package for handling Cross-Origin Resource Sharing.
* **Morgan:** HTTP request logger middleware for Node.js.
* **`dotenv` (for server):** For loading environment variables (e.g., `MONGODB_URI`, `JWT_SECRET`).
* **`@google/generative-ai** Google's official Node.js library for interacting with Gemini API.

 Database
MongoDB Atlas:** Cloud-hosted, managed MongoDB service

---



