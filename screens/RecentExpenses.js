import { Text } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";
import { ErrorOverlay } from "../components/ui/ErrorOverlay";

export function RecentExpenses(){
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true)
    const { expenses, setExpenses } = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
          setIsFetching(true);
          try{
            const expenses = await fetchExpenses();
            setExpenses(expenses);
          }catch(error){
            setError('Could not fetch expenses!')
          }
          setIsFetching(false);
        }
    
        getExpenses();
      }, []);
    

    const last7Days = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        const difference = today.getTime() - expenseDate.getTime();
        const differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
        return differenceInDays <= 7;
    })

    if(error && !isFetching){
      return <ErrorOverlay  message={error}/>
    }

    if (isFetching) {
      return <LoadingOverlay/>
    }

    return <ExpensesOutput fallbackText={'No expenses registered for the last 7 days'} expenses={last7Days} expensesPeriod={'Last 7 days'}/>
}

