import React from 'react';
import FocusAwareStatusBar from '../utils/FocusAwareStatusBar';
import SingleFriendScreenHeader from './components/SingleFriendScreenHeader';
import SingleFriendScreenConversation from './components/SingleFriendScreenConversation';
import SingleFriendScreenFormField from './components/SingleFriendScreenFormField';
import { useSelector } from 'react-redux';
import { selectFriendById } from '../../redux/friendsSlice';

export default function ChatSingleFriendScreen({ route }) {

    const friendId = route.params.friendId;
    const friend = useSelector(state => selectFriendById(state, friendId));

    return (
        <>
            <FocusAwareStatusBar barStyle='ligth-content' backgroundColor='#5d3fd3' />
            <SingleFriendScreenHeader profilePic={friend.profile_pic} username={friend.username} />
            <SingleFriendScreenConversation friend={friend} />
            <SingleFriendScreenFormField friendId={friend.id} />
        </>
    );
}