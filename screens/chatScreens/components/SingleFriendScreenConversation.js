import React, { useRef } from 'react';
import { FlatList} from 'react-native';
import styles from '../styles/SingleFriendScreenConversationStyles';
import { prettifyData } from '../../../utils/Utilyties';
import { useSelector } from 'react-redux';
import { selectMessagesByIds } from '../../../redux/messagesSlice';
import { selectUserId } from '../../../redux/userSlice';
import SingleFriendScreenMessage from './SingleFriendScreenMessage';

export default function SingleFriendScreenConversation({ friend }){

    const currentUserId = useSelector(selectUserId);
    const messagesIds = friend.messages_id;
    const messages = useSelector(state => selectMessagesByIds(state, messagesIds));
    
    const isMine = messageOwnerId => {
        if (messageOwnerId === currentUserId) return true;
        return false;
    }

    return(
        <FlatList 
            style={[styles.container, {scaleY: -1}]}
            data={messages}
            removeClippedSubview={true}
            initialNumToRender={20}
            renderItem={({ item }) => 
            <SingleFriendScreenMessage
                key={item.id}
                content={item.content}
                isMine={isMine(item.owner_id)}
                date={prettifyData(item.date)}
                friendProfilePic={friend.profile_pic}
            />}
        />
    );
}