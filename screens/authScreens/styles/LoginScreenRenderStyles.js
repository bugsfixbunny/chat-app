import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    innerFormContainer: {
        padding: 10
    },
    textInput: {
        backgroundColor: '#e8eaed',
        height: 50,
        borderRadius: 7,
        color: 'black',
        marginBottom: 10,
        padding: 5
    },
    formFocused: {
        backgroundColor: '#e8eaed',
        height: 50,
        borderRadius: 7,
        color: 'black',
        marginBottom: 10,
        padding: 5,
        borderColor: '#5d3fd3',
        borderWidth: 2
    },
    formError: {
        backgroundColor: '#f8c1bc',
        height: 50,
        borderRadius: 7,
        color: 'black',
        marginBottom: 10,
        padding: 5,
        borderColor: '#d62231',
        borderWidth: 2
    },
    bottomContainer: {
        margin: 10
    },
    bottomMessageContainer: {
        flexDirection: 'row'
    }
});