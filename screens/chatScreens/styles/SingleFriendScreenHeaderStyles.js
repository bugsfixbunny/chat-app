import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#5d3fd3',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    imageContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    profileImage: {
        height: 55,
        width: 55,
        borderRadius: 30
    },
    usernameText: {
        fontFamily: 'ShipporiAntiqueB1-Regular',
        color: '#e8eaed',
        fontSize: 16,
        paddingLeft: 5
    }
});