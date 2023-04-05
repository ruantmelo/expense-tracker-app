import { StyleSheet, Text, TextInput, View } from "react-native";

export function Input({label, textInputConfig }){
    return (
        <View>
            <Text>Label</Text>
            <TextInput {...textInputConfig} />
        </View>
    )
}

const styles = StyleSheet.create({})