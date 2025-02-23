# ✈️ Flight Inspirations App

A modern and interactive web application for exploring flight destinations, built with **React, MobX, and MUI**. The app allows users to search for flights, edit flight details, and manage data efficiently with caching and pagination.

## ✨ Features

- 🔍 **Search Flights** using IATA codes & departure dates.
- 🖱️ **Editable Table** with real-time updates.
- 📅 **Date Picker Integration** with MUI X.
- 🏗️ **Drag & Drop Columns** to rearrange the table.
- 📄 **Client-Side Pagination** for performance optimization.
- 📦 **Caching (10 min)** to reduce API calls.
- 🎨 **Fully Responsive UI** built with Material UI.

---

## 📹 Demo Video
📌 [Link to Demo Video](https://youtu.be/i3kfvI626gg)

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**
```sh
git clone git@github.com:AhmedZatar/web-code-challenge.git
cd web-code-challenge
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env.local` file in the root directory and add:
```
REACT_APP_AMADEUS_API_KEY=your_api_key
REACT_APP_AMADEUS_API_SECRET=your_api_secret
```

### 4️⃣ **Run the App**
```sh
npm start
```
The app will be available at `http://localhost:3000`.

---

## 🛠️ Technologies Used
- **React 18** with TypeScript
- **MobX** for state management
- **MUI** (Material UI) for styling
- **Axios** for API requests
- **Hello Pangea DnD** for drag & drop
- **Day.js** for date handling

---

## ⚠️ Security Notice 
**This application is NOT safe to be deployed in its current state.**
- API secrets are stored in the frontend `.env` file, making them vulnerable.
- Consider using a backend server to securely handle API requests.

---

## 📜 License
This project is licensed under the **MIT License**.
