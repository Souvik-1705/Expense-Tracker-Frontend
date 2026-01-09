import React, { useState } from "react";
import "../styles/ExpenseItem.css";
import toast from "react-hot-toast";

const ExpenseItem = ({ expense, fetchExpenses, token }) => {

  const formatDateForInput = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(formatDateForInput(expense.date));
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(formatDateForInput(expense.date));
    setIsEditing(true);
  };

  const updateExpense = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/expenses/${expense._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount, category, date }),
      });

      toast.success("Expense Updated");
      setIsEditing(false);
      fetchExpenses();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const deleteExpense = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/expenses/${expense._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Expense Deleted");
      fetchExpenses();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="expense-item">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={updateExpense}>Save</button>
          <button onClick={() => setIsEditing(false)}>Close</button>
        </>
      ) : (
        <>
          <h3>{expense.title}</h3>
          <p>₹{expense.amount}</p>
          <p>{expense.category}</p>
          <p>Date: {new Date(expense.date).toLocaleDateString("en-IN")}</p>
          <button onClick={startEditing}>Edit</button>
          <button onClick={deleteExpense}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ExpenseItem;
