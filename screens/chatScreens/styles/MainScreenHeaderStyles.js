import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#5d3fd3',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingBottom: 26
    },
    logoContainer: {
        flex: 1,
        alignItems:  'center',
        paddingBottom: 24,
    },
    profileImageContainer: {
        flex: 1,
        alignItems:  'center',
    },
    titleContainer: {
        flex: 1,
        paddingBottom: 24,
        alignItems:  'center',
    },
    title: {
        fontFamily: 'ShipporiAntiqueB1-Regular',
        color: '#e8eaed',
        fontSize: 20
    },
    logo: {
        height: 60,
        width: 60
    }, 
    profileImage: {
        height: 45,
        width: 45,
        borderRadius: 30
    },
    cameraIcon: {
        alignSelf: 'flex-end',
        top: -17,
        left: 4,
        opacity: 0.8
    }
});