import React, { useEffect } from 'react';
import { FlatList} from 'react-native';
import styles from '../styles/SingleFriendScreenConversationStyles';
import { prettifyData } from '../../../utils/Utilyties';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByIds, seenMessage } from '../../../redux/messagesSlice';
import { selectUserId, selectValidToken } from '../../../redux/userSlice';
import { SingleFriendScreenMessage } from './SingleFriendScreenMessage';
import useSocketsHandler from '../../../sockets/useSocketsHandler';

export default function SingleFriendScreenConversation({ friend }){

    const currentUserId = useSelector(selectUserId);
    const token = useSelector(selectValidToken);
    const messagesIds = friend.messages_id;
    const messages = useSelector(state => selectMessagesByIds(state, messagesIds));
    const dispatch = useDispatch();
    const sockets = useSocketsHandler();

    useEffect(() => {
        const updateHasSeen = () => {
            let toUpdate = [];
            messages.forEach(message => {
                if (!(message?.has_seen) && !(message?.owner_id == currentUserId)) {
                    toUpdate.push({id: message.id, changes: {has_seen: true}});
                }
            });
            if(!(toUpdate.length === 0)){
                dispatch(seenMessage(toUpdate));
                sockets('seen message', {token, friendId: friend.id, messages: toUpdate});
            }
        }
        updateHasSeen();
    }, [messages]);
    
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