import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import ChatRoutes from './ChatRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectLoggedIn, getUser } from '../redux/userSlice';
import Loading from '../screens/utils/Loading';

export default function NavSetup() {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (isLoggedIn === 'idle') {
            dispatch(getUser());
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