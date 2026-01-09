import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log("Failed to fetch user");
    }
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setExpenses(data);
  };
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [token]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    setExpenses([]);
    setShowRegister(false);
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  // ❌ Not logged in → show Login / Register
  if (!token || !user) {
    return (
      <div className="app-container">
        {showRegister ? (
          <Register
            onRegister={setUser}
            goToLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLogin={setUser}
            goToRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  // ✅ Logged in → Expense Tracker
  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      <h2 className="total">Total Expense: ₹{totalAmount}</h2>

      <ExpenseForm fetchExpenses={fetchExpenses} token={token} />
      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        token={token}
      />
    </div>
  );
}

export default App;
