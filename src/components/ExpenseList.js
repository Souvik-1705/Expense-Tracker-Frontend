import React from 'react'
import ExpenseItem from './ExpenseItem';
import "../styles/ExpenseList.css";

const ExpenseList = ({expenses,fetchExpenses,token}) => {
  return (
    <div className='expense-list'>
        {expenses.map((expense)=>(
            <ExpenseItem key={expense._id} expense={expense} fetchExpenses={fetchExpenses} token={token}/>
        ))}
    </div>
  )
}

export default ExpenseList