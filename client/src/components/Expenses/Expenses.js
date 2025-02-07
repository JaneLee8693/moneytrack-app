import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layout'
import ListItem from '../ListItem/ListItem'
import ExpenseForm from '../Forms/ExpenseForm'

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
        }
    }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;

function Expenses() {
    const {addExpense, expenses, getExpenses, deleteExpense, updateExpense, totalExpense} = useGlobalContext()
    const [editingExpense, setEditingExpense] = useState(null)

    useEffect(() =>{
        getExpenses()
    }, [])

    const handleUpdate = (id, updatedExpense) => {
        updateExpense(id, updatedExpense);
        setEditingExpense(null);
    }

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>${totalExpense()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm initialData={editingExpense} onSubmit={handleUpdate} />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <ListItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="red"
                                deleteItem={deleteExpense}
                                updateItem={setEditingExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

export default Expenses