import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5001/api/v1/";
const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async(id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const updateIncome = async (id, updatedIncome) => {
        const response = await axios.put(`${BASE_URL}update-income/${id}`, updatedIncome)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getIncomes();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    // calculate expenses
    const addExpense = async(income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async() => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async(id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const updateExpense = async (id, updatedExpense) => {
        const response = await axios.put(`${BASE_URL}update-expense/${id}`, updatedExpense)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getExpenses();
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
    
        return history.slice(0, 6)
    }


    return (
        <GlobalContext.Provider value={
            {
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            updateIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses, 
            deleteExpense,
            updateExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error,
            setError
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}