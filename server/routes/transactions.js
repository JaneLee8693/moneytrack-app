const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense');

const router = require('express').Router();

router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)
        .put('/update-income/:id', updateIncome)
        .post('/add-expense', addExpense)
        .get('/get-expenses', getExpenses)
        .delete('/delete-expense/:id', deleteExpense)
        .put('/update-expense/:id', updateExpense)

module.exports = router
