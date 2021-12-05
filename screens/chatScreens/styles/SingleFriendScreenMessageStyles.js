import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5
    },
    containerMine: {
        flexDirection: 'row-reverse'
    },
    contentContainer: {
        padding: 5,
        flex: 1,
        alignItems: 'flex-start'
    },
    contentContainerMine: {
        alignItems: 'flex-end'
    },
    messageContainer: {
        backgroundColor:  '#ece6fc',
        borderRadius: 30,
        padding: 15,
        flex: 1
    },
    messageContainerMine: {
        backgroundColor: '#5d3fd3',
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 30
    },
    profileImageContainer: {
        padding: 5
    },
    message: {
        fontFamily: 'ShipporiAntique-Regular',
        color: '#7d7494'
    },
    messageMine: {
        color: 'white'
    },
    date: {
        fontFamily: 'ShipporiAntiqueB1-Regular',
        color: 'grey',
        padding: 5,
        fontSize: 10
    }
});