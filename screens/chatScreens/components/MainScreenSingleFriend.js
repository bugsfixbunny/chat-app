import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectMessageById, selectNotSeenNumber, selectMessagesLoaded } from '../../../redux/messagesSlice';
import { prettifyData } from '../../../utils/Utilyties';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/MainScreenSingleFriendStyles';
import { ip } from '../../../utils/Utilyties';

export default React.memo(function MainScreenSingleFriendMemo({ friend }) {

    const navigation = useNavigation();
    const friendId = friend.id;
    const messagesLoaded = useSelector(selectMessagesLoaded);
    let lastMessage = null;
    let notSeenNumber = null;

    const lastMessageId = friend.messages_id[friend.messages_id.length - 1];
    if (lastMessageId && messagesLoaded) {
        lastMessage = useSelector(state => selectMessageById(state, lastMessageId));
        notSeenNumber = useSelector(state => selectNotSeenNumber(state, friend.messages_id));
    }
    

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatSingleFriendScreen', {friendId})}>
            <View style={styles.container}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: `${ip}/users/get-profile-image/${friend.profile_pic}`}}
                    />
                </View>
                <View style={styles.userDataContainer}>
                    <Text numberOfLines={1} style={styles.username}>{friend.username}</Text>
                    <Text numberOfLines={1} style={styles.lastMessage}>{lastMessage ? lastMessage.content : 'Start conversation'}</Text>
                </View>
                <View style={styles.lastSeenContainer}>
                    <Text style={[styles.lastMessage, styles.lastMessageDate]}>{lastMessage ? prettifyData(lastMessage.date) : null}</Text>
                    {(notSeenNumber == 0 && notSeenNumber != null) ? null :
                        <Text style={styles.notSeenNumber}>{notSeenNumber}</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
});