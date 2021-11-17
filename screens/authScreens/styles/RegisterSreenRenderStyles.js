import { StyleSheet } from "react-native";

export default StyleSheet.create({
    textInput: {
        backgroundColor: '#e8eaed',
        height: 40,
        borderRadius: 7,
        color: 'black',
        margin: 10,
        padding: 5
    }, 
    text: {
        color: 'white', 
        fontSize: 15, 
        padding: 10
    },
    textPolicy: {
        color: 'white',
        fontWeight: '700', 
        fontSize: 10,
        padding: 10
    },
    formError: {

    },
    formFocused: {
        borderColor: '#5d3fd3',
        borderWidth: 2
    },
    formError: {
        backgroundColor: '#f8c1bc',
        color: 'black',
        borderColor: '#d62231',
        borderWidth: 2
    }
});