import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/SingleFriendScreenMessageStyles';
import { selectUserProfilePic } from '../../../redux/userSlice';
import { useSelector } from 'react-redux';
import { ip } from '../../../utils/Utilyties';

export default React.memo(function SingleFriendScreenMessage({ content, isMine, date, friendProfilePic, id }) {

    const profilePic = useSelector(selectUserProfilePic);

    useEffect(() => {
        console.log('message rerendered: ', id);
    });

    return (
        <View style={[styles.container, {scaleY: -1}, isMine ? styles.containerMine : {}]}>
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.profileImage}
                    source={isMine 
                    ? {uri: `${ip}/users/get-profile-image/${profilePic}`} 
                    : {uri: `${ip}/users/get-profile-image/${friendProfilePic}`}
                    }
                />
            </View>
            <View style={[styles.contentContainer, isMine ? styles.contentContainerMine : {}]}>
                <View style={[styles.messageContainer, isMine ? styles.messageContainerMine : {}]}>
                    <Text style={[styles.message, isMine ? styles.messageMine : {}]}>{content}</Text>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );
});