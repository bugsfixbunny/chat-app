import React, { useEffect } from 'react';
import FocusAwareStatusBar from '../utils/FocusAwareStatusBar';
import MainScreenHeader from './components/MainScreenHeader';
import MainScreenSearchBar from './components/MainScreenSearchBar';
import MainScreenFriendsList from './components/MainScreenFriendsList';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends,selectFriendsLoaded } from '../../redux/friendsSlice';
import { getMessages, selectMessagesLoaded } from '../../redux/messagesSlice';

export default function ChatMainScreen(){

    const dispatch = useDispatch();
    const messagesLoaded = useSelector(selectMessagesLoaded);
    const friendsLoaded = useSelector(selectFriendsLoaded);

    useEffect(() => {
        if(friendsLoaded === 'idle'){
            dispatch(getFriends());
        }
        if(messagesLoaded === 'idle'){
            dispatch(getMessages());
        }
    }, [messagesLoaded, friendsLoaded]);
    
    return (
        <>
            <FocusAwareStatusBar barStyle='ligth-content' backgroundColor='#5d3fd3' />
            <MainScreenHeader />
            <MainScreenSearchBar />
            <MainScreenFriendsList />
        </>
    );
}