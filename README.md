# 💸 Expense Tracker – Frontend

This is the frontend UI of the Expense Tracker application built with React.  
It allows authenticated users to view, add, edit, and delete their expenses.

---

## 🚀 Features

- User Authentication (Login / Register)
- View all expenses after login
- Add, Edit, Delete expense entries
- Responsive UI for mobile and desktop
- Connects with backend API using fetch + JWT token

---

## 🛠 Tech Stack

- React.js
- JavaScript (ES6+)
- CSS (responsive styling)
- Fetch API
- react-hot-toast for notifications

---

## 🎯 How It Works

When a user logs in:
- The app stores the JWT token in `localStorage`.
- The token is used in Authorization header for fetching user info and expenses.
- Authenticated users can interact with expense data.

---

## 📁 How to Run Locally

1. Clone the repo

```bash
git clone https://github.com/Souvik-1705/Expense-Tracker-Frontend.git
cd Expense-Tracker-Frontend
