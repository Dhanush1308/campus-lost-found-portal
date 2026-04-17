# 🔍 Campus Lost & Found Portal

![Live Demo](https://img.shields.io/badge/Live_Demo-Available_Now-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

A fully responsive, modern web application designed for university and college campuses to seamlessly report, search, and find lost items. 

**Live Demo:** [https://campus-lost-found-portal-mxo8.onrender.com](https://campus-lost-found-portal-mxo8.onrender.com)

---

## 🌟 Introduction

Losing something valuable on campus can be stressful. The **Campus Lost & Found Portal** solves this problem by providing a centralized platform for students and staff to list items they've lost, or report items they've found. 

With a premium "Glassmorphism" UI, dynamic animations, and an intuitive user experience, finding lost belongings has never been easier!

### Key Features
- **Report Lost/Found Items:** Easily submit a form detailing the item, location, and category.
- **Browse All Items:** View all reported items in a clean, modern grid layout.
- **Real-time Database:** All items are stored securely and updated instantly.
- **Categorization:** Items are tagged with visually distinct badges (e.g., Electronics, Books, Keys, Bags) to easily find what you're looking for.

---

## 🏗️ Project Structure

This is a full-stack application built using the **MERN** stack (MongoDB, Express, React, Node.js). The repository is split into two main directories:

```text
campus-lost-found/
├── backend/               # Node.js + Express backend API
│   ├── server.js          # Main entry point & API routes
│   ├── .env               # Environment variables (MongoDB URI, Port)
│   └── package.json       # Backend dependencies
│
├── frontend/              # React.js frontend application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── App.js         # Main UI component & state management
│   │   ├── App.css        # Premium Glassmorphism design system
│   │   └── index.css      # Base styles & typography
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

---

## 💻 Tech Stack

- **Frontend:** React.js, Axios, CSS Variables (Glassmorphism UI), Google Fonts (Inter)
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** Render (Live Demo)

---

## 🚀 How to Run Locally

If you want to run this application on your local machine, follow these steps:

### Prerequisites
- Node.js installed
- A MongoDB Atlas account (or local MongoDB server)

### 1. Clone the repository
```bash
git clone https://github.com/Dhanush1308/campus-lost-found-portal.git
cd campus-lost-found-portal
```

### 2. Setup the Backend
Open a terminal and run the following commands:
```bash
cd backend
npm install

# Create a .env file and add your MongoDB connection string:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

npm start
```

### 3. Setup the Frontend
Open a new terminal and run the following commands:
```bash
cd frontend
npm install
npm start
```

The frontend will automatically run on `http://localhost:3000` and communicate with your local backend.

---

*Built with ❤️ for a better campus experience.*
