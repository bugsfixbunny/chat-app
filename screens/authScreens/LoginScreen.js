import React, { useState } from 'react';
import LoginScreenRender from './LoginScreenRender';
import * as yup from 'yup';
import { postFetch, ip } from '../../utils/Utilyties';
import { loginUser, selectLoginErrorMessage } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginScreen({ navigation }) {

    const [accountExists, setAccountExists] = useState(false);

    const dispatch = useDispatch();
    const loginErrorMessage = useSelector(selectLoginErrorMessage);

    const goToRegister = () => navigation.navigate('RegisterScreen');

    const handleLogin = body => {
        dispatch(loginUser(body))
    }

    const formSchema = yup.object({
        email: yup
            .string()
            .email()
            .required()
            .test('testing', '', async (email = '') => {
                const response = await postFetch(`${ip}/users/user-exists`, {email});
                if(response.status !== 200) {
                    return goToRegister();
                }
                return setAccountExists(true);
            })
    });

    const formSchemaLogin = yup.object({
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .min(8)
            .required()
    });

    return (
        <LoginScreenRender
            loginErrorMessage={loginErrorMessage}
            handleLogin={handleLogin}
            formSchema={formSchema}
            formSchemaLogin={formSchemaLogin}
            accountExists={accountExists}
            goToRegister={goToRegister}
        /> 
    );
}