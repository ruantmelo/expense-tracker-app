import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";

export function ManageExpense({route, navigation}){
    const expenseId = route.params?.expenseId;

    const isEditing = !!expenseId;

    const {deleteExpense, addExpense, updateExpense} = useContext(ExpensesContext);

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

    function confirmHandler(){
        if(isEditing){
            updateExpense(expenseId); // TODO
        } else{
            addExpense(); // TODO
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})
