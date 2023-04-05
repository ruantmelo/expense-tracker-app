import { createContext, useReducer } from "react"

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "New TV",
        amount: 799.49,
        date: new Date('2023-04-1')
    },
    {
        id: "e2",
        description: "Car Insurance",
        amount: 294.67,
        date: new Date('2023-04-1')
    },
    {
        id: "e3",
        description: "New Desk",
        amount: 450,
        date: new Date('2023-04-1')
    },
    {
        id: "e4",
        description: "Food",
        amount: 230,
        date: new Date('2023-03-1')
    }
];


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount,date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date} ) => {}
})

function expensesReducer(state, action){
    switch (action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{id, ...action.payload},...state]
        case 'UPDATE':
            const expenseIndex = state.findIndex(expense => expense.id === action.payload.id)
            const updatedExpense = {...state[expenseIndex], ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[expenseIndex] = updatedExpense
            return updatedExpenses
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload)
        default:
            return state;

    }
}

export function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)


    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData})
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id})
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id, data: expenseData}})
    }

    const value = {expenses: expensesState, addExpense, deleteExpense, updateExpense}

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

