import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import ChatRoutes from './ChatRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectLoggedIn, getUser } from '../redux/userSlice';
import { clearFriends } from '../redux/friendsSlice';
import { clearMessages } from '../redux/messagesSlice';
import Loading from '../screens/utils/Loading';

export default function NavSetup() {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (isLoggedIn === 'idle') {
            dispatch(getUser());
        }
        if (isLoggedIn == false) {
            dispatch(clearFriends());
            dispatch(clearMessages());
        }
    }, [isLoggedIn, dispatch]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
    <NavigationContainer>
        {isLoggedIn === true ? <ChatRoutes /> : <AuthRoutes />}
    </NavigationContainer>
    );
}