import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles/LoginScreenRenderStyles';
import { Formik } from 'formik';
import Button from "../utils/Button";
import LoginSkeleton from '../utils/LoginSkeleton';
import FormErrorMessage from '../utils/FormErrorMessage';

export default function LoginScreenRender({ 
    goToRegister,
    accountExists,
    formSchema,
    formSchemaLogin,
    handleLogin,
    loginErrorMessage
}) {

    const [inputEmailIsFocused, setInputEmailIsFocused] = useState(false);
    const [inputPasswordIsFocused, setInputPasswordIsFocused] = useState(false);

    return (
        <LoginSkeleton title={accountExists ? 'Log in' : 'Hi!'}>
            <View style={styles.innerFormContainer}>
                {accountExists ? 
                <Formik 
                initialValues={{ email: '', password: '' }}
                    validationSchema={formSchemaLogin}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={values => {
                        handleLogin(values);
                    }}
                >
                    {props => <>
                        <Text style={{color: 'white', padding: 5, fontWeight: '700'}}>Welcome back!</Text>
                        <TextInput
                            onFocus={() => setInputEmailIsFocused(true)}
                            onBlur={() => setInputEmailIsFocused(false)}
                            style={[styles.textInput, props.touched.email && props.errors.email ? styles.formError : inputEmailIsFocused ? styles.formFocused : {}]}
                            placeholder={'Email'}
                            value={props.values.email}
                            onChangeText={props.handleChange('email')}
                            autoComplete='email'
                            placeholderTextColor='#5d3fd3'
                        />
                        <TextInput
                            onFocus={() => setInputPasswordIsFocused(true)}
                            onBlur={() => setInputPasswordIsFocused(false)}
                            style={[styles.textInput, props.touched.password && props.errors.password ? styles.formError : inputPasswordIsFocused ? styles.formFocused : {}]}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            value={props.values.password}
                            onChangeText={props.handleChange('password')}
                            placeholderTextColor='#5d3fd3'
                        />
                        <FormErrorMessage 
                            condition={props.touched.password && props.errors.password}
                            message={props.errors.password}
                        />
                        <FormErrorMessage 
                            condition={loginErrorMessage !== null}
                            message={loginErrorMessage}
                        />
                        <Button
                            onPress={props.handleSubmit}
                            alingSelf='flex-start'
                            margin={10}
                            title='Continue'
                        />
                    </>}
                </Formik>
                : 
                <Formik 
                    initialValues={{ email: '' }}
                    validationSchema={formSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {props => <>
                        <TextInput
                            onFocus={() => setInputEmailIsFocused(true)}
                            onBlur={() => setInputEmailIsFocused(false)}
                            style={[styles.textInput, props.touched.email && props.errors.email ? styles.formError : inputEmailIsFocused ? styles.formFocused : {}]}
                            placeholder={'Email'}
                            value={props.values.email}
                            onChangeText={props.handleChange('email')}
                            autoComplete='email'
                            placeholderTextColor='#5d3fd3'
                        />
                        <FormErrorMessage 
                            condition={props.touched.email && props.errors.email}
                            message={props.errors.email}
                        />
                        <Button
                            onPress={props.handleSubmit}
                            alingSelf='flex-start'
                            margin={10}
                            title='Continue'
                        />
                    </>}
                </Formik>
                }    
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomMessageContainer}>
                    <Text style={{color: '#e8eaed'}}>Don't have an account? </Text>
                    <Button
                        onPress={goToRegister}
                        alingSelf='flex-start'
                        backgroundColor={null}
                        padding={0}
                        textColor='#5d3fd3'
                        textPadding={0}
                        title='Sing up'
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Button
                        backgroundColor={null}
                        alingSelf='flex-start'
                        alingButton='flex-start'
                        padding={0}
                        textPadding={0}
                        title='Forgot your password?'
                    />
                </View>
            </View>
        </LoginSkeleton>
    );
}