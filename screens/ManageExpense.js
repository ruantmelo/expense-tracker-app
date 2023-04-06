import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";
import { ErrorOverlay } from "../components/ui/ErrorOverlay";

export function ManageExpense({route, navigation}){
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expenseId = route.params?.expenseId;

    const isEditing = !!expenseId;

    const {expenses, deleteExpense: deleteContextExpense, addExpense, updateExpense: updateContextExpense} = useContext(ExpensesContext);

    const selectedExpense = expenses.find(expense => expense.id === expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try{
            await deleteExpense(expenseId);
            deleteContextExpense(expenseId);
            navigation.goBack();
        }catch(error){
            setError('Could not delete expense!');
            setIsSubmitting(false);
           
        }
        
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        try{
            if(isEditing){
                updateContextExpense(expenseId, expenseData);
                await updateExpense(expenseId, expenseData);
                navigation.goBack();
            } else{
                const id = await storeExpense(expenseData);
                addExpense({ ...expenseData, id: id });
            }
        } catch(error){
            setError('Could not save expense!');
            setIsSubmitting(false);
        }
      
    }


    if(error && !isSubmitting){
        return <ErrorOverlay message={error}/>
    }

    if(isSubmitting){
        return <LoadingOverlay/>
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
