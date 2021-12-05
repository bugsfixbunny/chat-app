import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/MainScreenHeaderStyles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { selectUserProfilePic, logoutUser } from '../../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ip } from '../../../utils/Utilyties';


export default function MainScreenHeader() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profilePic = useSelector(selectUserProfilePic);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => dispatch(logoutUser())}>
                <Image
                    source={require('../../../assets/mylogo.png')}
                    style={styles.logo}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Messages</Text>
            </View>
            <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ChatProfilePhoto')}>
                    <Image 
                        source={{uri: `${ip}/users/get-profile-image/${profilePic}`}}
                        style={styles.profileImage}
                    />
                    <Ionicons style={styles.cameraIcon} name="camera" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}