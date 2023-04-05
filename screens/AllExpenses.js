import { Text } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export function AllExpenses(){
    const {expenses} = useContext(ExpensesContext);

    return <ExpensesOutput fallbackText={'No registered expenses found'} expenses={expenses} expensesPeriod={'Total'}/>
}

