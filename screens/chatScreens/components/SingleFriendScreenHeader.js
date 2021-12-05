import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SingleFriendScreenHeaderStyles';
import { ip } from '../../../utils/Utilyties';


export default function SingleFriendScreenHeader({ username, profilePic }) {

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatMainScreen')} style={styles.imageContainer}>
                <Ionicons name="arrow-back-sharp" size={25} color="white" />
                <Image
                    style={styles.profileImage}
                    source={{uri: `${ip}/users/get-profile-image/${profilePic}`}}
                />
            </TouchableOpacity>
            <Text style={styles.usernameText}>{username}</Text>
        </View>
    );
}