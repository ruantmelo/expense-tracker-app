import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";

export function ManageExpense({route, navigation}){
    const expenseId = route.params?.expenseId;

    const isEditing = !!expenseId;

    const {expenses, deleteExpense, addExpense, updateExpense} = useContext(ExpensesContext);

    const selectedExpense = expenses.find(expense => expense.id === expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler(){
        deleteExpense(expenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(expenseData){
        if(isEditing){
            updateExpense(expenseId, expenseData);
        } else{
            addExpense(expenseData); 
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm defaultValues={selectedExpense} onSubmit={confirmHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'}  onCancel={cancelHandler}/>
           
            {isEditing && <View style={styles.deleteContainer}>
                <IconButton size={36} onPress={deleteExpenseHandler} icon='trash' color={GlobalStyles.colors.error500}/>
                </View>
                }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})
