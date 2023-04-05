import { Text } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export function RecentExpenses(){
    const { expenses } = useContext(ExpensesContext);

    const last7Days = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        const difference = today.getTime() - expenseDate.getTime();
        const differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
        return differenceInDays <= 7;
    })

    return <ExpensesOutput fallbackText={'No expenses registered for the last 7 days'} expenses={last7Days} expensesPeriod={'Last 7 days'}/>
}

