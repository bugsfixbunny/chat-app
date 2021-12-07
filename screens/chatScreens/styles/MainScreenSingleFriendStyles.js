import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
    },
    profileImageContainer: {
        padding: 15
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
    userDataContainer: {
        padding: 10,
        flex: 1,
        alignSelf: 'flex-start',
    },
    username: {
        fontFamily: 'ShipporiAntiqueB1-Regular',
        color: '#5d3fd3',
        fontSize: 16
    },
    lastMessage: {
        color: 'grey',
        fontSize: 12,
    },
    lastMessageDate: {
        fontFamily: 'ShipporiAntique-Regular',
        fontSize: 11
    },
    lastSeenContainer: {
        padding: 10,
    },
    notSeenNumber: {
        fontFamily: 'ShipporiAntique-Regular',
        fontSize: 11,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#5d3fd3',
        padding: 5,
        borderRadius: 30
    }
});