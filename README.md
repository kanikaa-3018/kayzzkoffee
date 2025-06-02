
# ☕ KayzzKoffee — The Ultimate Coffee Experience

Welcome to **KayzzKoffee**, an interactive coffee web app designed to bring the **essence of coffee culture** online. From brewing knowledge to recipe inspiration, digital bitmoji fun, and personalized dashboards — this platform blends backend functionality with a beautiful user interface.

> 🛠️ This was my **first full-stack project** built to learn **backend development using Node.js, Express, MongoDB, and EJS**. Along the way, I implemented user authentication, session handling, Dockerization, and dynamic page rendering.

---

## 📸 Preview

![App Preview](https://user-images.githubusercontent.com/your-link-here.png) <!-- Optional preview image link -->

---

## 🚀 Features

### 👤 Authentication
- User registration and login with session support
- Passwords are encrypted and stored securely
- Session-based login via Passport.js

### 📋 Coffee Recipes
- Dynamic recipe list rendered from MongoDB
- Beautiful recipe detail pages with ingredients and steps
- Server-side rendering using EJS

### 🧠 BrewIQ (Learn to Brew)
- Learn popular brewing methods like Pour Over, French Press, etc.
- Visual cards, fun facts, and brewing guides

### 🤖 Quiz Page
- A short and fun coffee knowledge quiz
- Score can be extended to be stored/displayed per user

### ☕ Buy A Coffee
- Mock coffee store with cart and order management
- Users can add items, checkout, and see order history

### 🛒 Dashboard
- Personalized dashboard showing:
  - Orders
  - Quiz interactions
  - Profile information

### 🧑‍🎨 Bitmoji Designer
- Playful page where users can design a coffee-themed avatar
- Great for personalization and future gamification

### 📩 Contact Us
- Form for users to send feedback or queries
- Clean UI and proper input validation

---

## 🖼️ Tech Stack

| Layer          | Tools Used                             |
|----------------|-----------------------------------------|
| **Frontend**   | EJS, Bootstrap/Tailwind CSS, Vanilla JS |
| **Backend**    | Node.js, Express.js                    |
| **Database**   | MongoDB (Mongoose)                     |
| **Auth**       | Passport.js + Sessions                 |
| **Templating** | EJS                                    |
| **Deployment** | Docker (Containerized Setup)           |

---

## 🐳 Dockerized Setup

### 📦 Requirements
- Node.js (for local)
- Docker (for containerized setup)
- MongoDB Atlas URI (or local MongoDB)

### 🧾 Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/kayzzkoffee.git
cd kayzzkoffee
````

#### 2. Create `.env` File

```bash
touch .env
```

Add the following:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net
SESSION_SECRET=yourSessionSecret
NODE_ENV="development"
YOUR_FOURSQUARE_API_KEY=yoyrApiKwyForMaps
```

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Run Locally (Without Docker)

```bash
npm start
```

#### 5. OR Run with Docker

```bash
docker build -t kayzzkoffee .
docker run -p 3000:3000 --env-file .env kayzzkoffee
```

---

## 📁 Project Structure

```
kayzzkoffee/
├── views/             # EJS Templates (index, recipes, login, etc.)
├── public/            # Static files (CSS, JS, images)
├── routes/            # Express route files
├── models/            # Mongoose models
├── config/            # Configuration loader
├── .env               # Environment variables (ignored)
├── Dockerfile         # Docker setup
├── app.js             # Main Express app
├── package.json
```

---

## 🔐 Environment & Git Best Practices


**`.gitignore` includes:**

```
.env
/node_modules
/config/development.json
```

Add these if not present using:

```bash
echo ".env" >> .gitignore
echo "/config/development.json" >> .gitignore
```

---

## 🎯 Learning Outcomes

This project helped me:

* Understand **backend architecture**
* Work with **MongoDB and Mongoose**
* Set up **authentication and session management**
* Use **EJS** for server-side rendering
* **Dockerize** a full web application
* Deploy-ready structure for real-world use

---

## 💡 Future Enhancements

* 💳 Stripe or Razorpay integration for real coffee purchases
* 📈 Dashboard analytics (favorites, orders by month, etc.)
* 🔐 Admin panel for adding/editing recipes
* 🤖 ChatGPT-like CoffeeBot assistant
* 📱 React Native app for mobile users

---

## 📬 Contact

Feel free to reach out for questions or collaborations:

**Creator:** Kayz
**Email:** [kanikasin216@gmail.com](kanikasin216@gmail.com)
**GitHub:** [@kanikaa-3018](https://github.com/kanikaa-3018)

---

## ⭐ Credits

Inspired by my love for coffee and the desire to dive deep into backend development. Built with care, ☕, and lots of debugging.

---


