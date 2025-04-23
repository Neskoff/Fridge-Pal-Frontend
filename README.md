# 🧊 FridgePal Frontend

This is the frontend for **FridgePal**, a web application that helps users track items in their fridge using images. Built with React, this app provides an intuitive user interface for uploading images, managing fridge items, tracking expiration dates, and exploring recipe suggestions.

---

## 🛠 Tech Stack

- **Language:** JavaScript / TypeScript
- **Framework:** React (v18+)
- **State Management:** Context API / Redux
- **HTTP Client:** Axios / Fetch
- **Routing:** React Router (v6+)
- **Authentication:** JWT stored in localStorage
- **API Docs Consumption:** Swagger-generated types

---

## 🚀 Features

- 🖼️ Image Upload for Fridge Item Detection
- 📦 View, Add, Edit & Delete Fridge Items
- 🗓️ Track Expiration Dates
- 🔐 User Authentication & Session Management
- ⚙️ Responsive UI for Mobile & Desktop
- 🔄 Integration with the FridgePal Backend API

---

## 🚀 Running Locally


1. **Set up environment variables:**

   Copy the example file and configure your own environment:

   ```bash
   cp .env.example .env
   ```

   Fill in the required variables:

   ```
   REACT_APP_API_URL=
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the app:**

   ```bash
   npm run start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication

This app uses JWT tokens issued by the backend. After login or signup, the token is stored in `localStorage` and sent along with each API request via the `Authorization` header.

---

## 📚 API Documentation

All backend endpoints are documented via Swagger and can be explored here:

🔗 [FridgePal Swagger UI](https://fridge-pal-backend.onrender.com/swagger-ui/index.html)
