import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ManageExpense } from './screens/ManageExpense';
import { AllExpenses } from './screens/AllExpenses';
import { RecentExpenses } from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons'
import { IconButton } from './components/ui/IconButton';
import { ExpensesContextProvider } from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerRight: ({tintColor}) => <IconButton onPress={() => navigation.navigate('ManageExpense')} size={24} color={tintColor} icon="add"/>,
      tabBarActiveTintColor: GlobalStyles.colors.accent500
      
    })}>
      <BottomTabs.Screen options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" color={color} size={size}/>
      }} name="RecentExpenses" component={RecentExpenses}/>
      <BottomTabs.Screen options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" color={color} size={size}/>
      }} name="AllExpenses" component={AllExpenses}/>
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
    <ExpensesContextProvider>
        <NavigationContainer>
        
        <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',

        }}>
            <Stack.Screen options={{headerShown: false}} name="ExpensesOverview" component={ExpensesOverview}/>
            <Stack.Screen options={{presentation: 'modal'}} name="ManageExpense" component={ManageExpense}/>
        </Stack.Navigator>
      
      </NavigationContainer>
    </ExpensesContextProvider>
     <StatusBar style="light" />
    </>
   
   
  );
}
