import { Alert, StyleSheet, Text, View } from "react-native";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";

export function ExpenseForm({onCancel, defaultValues, onSubmit, submitButtonLabel}){
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
        
    })

    function inputChangedHandler(inputName, inputValue){
        setInputs(oldState => {
            return {
                ...oldState,
                [inputName]: {
                    value: inputValue,
                    isValid: true
                }
            }
        })
    }


    function submitHandler(){
        const expenseData = {
                amount: +inputs.amount.value,
                date: new Date(inputs.date.value),
                description: inputs.description.value,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date?.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs(oldState => {
                return {
                    amount: {
                        value: oldState.amount.value, 
                        isValid: amountIsValid
                    },
                    date: {
                        value: oldState.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: oldState.description.value,
                        isValid: descriptionIsValid
                    }
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input invalid={!inputs.amount.isValid} style={styles.rowInput} label='Amount' textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }} />
               
                <Input invalid={!inputs.date.isValid} style={styles.rowInput}  label='Date' textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    maxLength: 10,
                    value: inputs.date.value,
                }}/>
            </View>
            <Input invalid={!inputs.description.isValid} label='Description' textInputConfig={{
                onChangeText: inputChangedHandler.bind(this, 'description'),
                multiline: true,
                value: inputs.description.value,
            }}/>
            {formIsInvalid && <Text style={styles.errorText}>Invalid values</Text>}
             <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20,

    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rowInput:{
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
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
})