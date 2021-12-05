import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../redux/friendsSlice';
import MainScreenSingleFriend from './MainScreenSingleFriend';

export default function MainScreenFriendsList() {

    const friends = useSelector(state => selectAllFriends(state));

    return (
        <ScrollView>
            {friends.map(friend => 
            <MainScreenSingleFriend
                key={friend.id}
                friend={friend}
            />
            )}
        </ScrollView>
    );
}
