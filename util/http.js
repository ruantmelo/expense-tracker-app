import axios from "axios";

const BACKEND_URL ='https://react-native-course-572c2-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData){
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL + '/expenses.json')

    const expenses = [];

    for (const key in response.data){
        expenses.push({
            id: key,
            ...response.data[key],
            date: new Date(response.data[key].date)
        })
    }

    return expenses;
}

export async function updateExpense(id, expenseData){
    return await axios.put(BACKEND_URL + '/expenses/' + id + '.json', expenseData);
}

export async function deleteExpense(id){
    await axios.delete(BACKEND_URL + '/expenses/' + id + '.json');
}
