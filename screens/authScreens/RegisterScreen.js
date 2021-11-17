import React from "react";
import RegisterScreenRender from "./RegisterScreenRender";
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/userSlice';
import { postFetch, ip } from "../../utils/Utilyties";

export default function RegisterScreen({ navigation }) {

    const dispatch = useDispatch();

    const formSchema = yup.object({
        email: yup
            .string()
            .email()
            .required()
            .test('testing', 'Email is already in use.', async (email = '') => {
                const response = await postFetch(`${ip}/users/available`, {field: 'email', email});
                if(response.json.email){
                    return false;
                }
                return true;
            }),
        name: yup
            .string()
            .max(24)
            .required()
            .test('testing', 'Username is already in use.', async (name = '') => {
                const response = await postFetch(`${ip}/users/available`, {field: 'name', name: name});
                if(response.json.name){
                    return false;
                }
                return true;
            }),
        password: yup
            .string()
            .min(8)
            .required()
    });

    const goBackToLogin = () => {
        navigation.goBack();
    }

    const handleRegistration = body => {
        dispatch(registerUser(body));
    }

    return(
        <RegisterScreenRender
            handleRegistration={handleRegistration}
            goBackToLogin={goBackToLogin}
            formSchema={formSchema}
        />
    );
}