import React, { useEffect } from 'react';
import FocusAwareStatusBar from '../utils/FocusAwareStatusBar';
import MainScreenHeader from './components/MainScreenHeader';
import MainScreenSearchBar from './components/MainScreenSearchBar';
import MainScreenFriendsList from './components/MainScreenFriendsList';
import { useDispatch } from 'react-redux';
import { getFriends } from '../../redux/friendsSlice';
import { getMessages } from '../../redux/messagesSlice';
import { getFetch, ip, postFetch } from '../../utils/Utilyties';

export default function ChatMainScreen(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
        dispatch(getMessages());
        postFetch(`${ip}/users/add-friend`, {name: 'Luccas'})
    }, []);
    
    return (
        <>
            <FocusAwareStatusBar barStyle='ligth-content' backgroundColor='#5d3fd3' />
            <MainScreenHeader />
            <MainScreenSearchBar />
            <MainScreenFriendsList />
        </>
    );
}