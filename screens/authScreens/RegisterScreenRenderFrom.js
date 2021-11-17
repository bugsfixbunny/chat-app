import React, { useState } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Button from '../utils/Button';
import styles from './styles/RegisterSreenRenderStyles';
import FormErrorMessage from '../utils/FormErrorMessage';

export default function RegisterSreenRenderForm({ 
    formSchema, 
    handleRegistration,
}) {

    const [inputEmailIsFocused, setInputEmailIsFocused] = useState(false);
    const [inputNameIsFocused, setInputNameIsFocused] = useState(false);
    const [inputPasswordIsFocused, setInputPasswordIsFocused] = useState(false);

    return (
        <Formik
            initialValues={{ email: '', name: '', password: '' }}
            validationSchema={formSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={values => {
                handleRegistration(values);
            }}
        >
            {props => <>
                <TextInput
                    onFocus={() => setInputEmailIsFocused(true)}
                    onBlur={() => {setInputEmailIsFocused(false)}}
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
                <TextInput
                    onFocus={() => setInputNameIsFocused(true)}
                    onBlur={() => {setInputNameIsFocused(false)}}
                    style={[styles.textInput, props.touched.name && props.errors.name ? styles.formError : inputNameIsFocused ? styles.formFocused : {}]}
                    placeholder={'Name'}
                    value={props.values.name}
                    onChangeText={props.handleChange('name')}
                    placeholderTextColor='#5d3fd3'
                />
                <FormErrorMessage 
                    condition={props.touched.name && props.errors.name}
                    message={props.errors.name}
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
                <View style={{flexDirection: 'row'}}> 
                    <Text 
                        style={styles.textPolicy}
                    >
                        By clicking Agree and continue bellow, I agree to:
                        <TouchableOpacity>
                            <Text style={{color: '#5d3fd3', fontSize: 12, fontWeight: '700'}}>Sell my Soul, Terms of Service and NOT Privacy Policy</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <Button
                    onPress={props.handleSubmit}
                    alingSelf='flex-start'
                    margin={10}
                    title='Agree and continue'
                />
            </>
            }
        </Formik>
    );
}