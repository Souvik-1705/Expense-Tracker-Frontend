import React, { useState } from 'react';
import "../styles/ExpenseForm.css";
import toast from 'react-hot-toast';

const ExpenseForm = ({fetchExpenses,token}) => {
    const[title,setTitle]=useState("");
    const[amount,setAmount]=useState("");
    const[category,setCategory]=useState("");
    const[date,setDate]=useState("");


    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!title || !amount || !category || !date){
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const normalizedDate = new Date(date).toISOString();

            await fetch(`${process.env.REACT_APP_API_URL}/expenses`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({title,amount,category,date:normalizedDate})
        });
            toast.success("Expense added successfully");
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
            fetchExpenses();
        } catch (error) {
            toast.error("Failed to add expense");
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Title'value={title}onChange={(e)=>setTitle(e.target.value)}/>
            <input placeholder='Amount'value={amount}onChange={(e)=>setAmount(e.target.value)}/>
            <input placeholder='Category'value={category}onChange={(e)=>setCategory(e.target.value)}/>
            <input type="date" value={date}onChange={(e)=>setDate(e.target.value)}/>
            <button type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default ExpenseForm;