import React from "react";
import styles from './styles/RegisterSreenRenderStyles';
import { Text, TouchableOpacity, View } from "react-native";
import LoginSkeleton from "../utils/LoginSkeleton";
import { FontAwesome } from '@expo/vector-icons'; 
import RegisterSreenRenderForm from './RegisterScreenRenderFrom';

export default function RegisterScreenRender ({
    goBackToLogin,
    formSchema,
    handleRegistration,
}) {
    return (
        <View style={{backgroundColor: 'black', height: '100%'}}>
            <TouchableOpacity style={{position: 'absolute', zIndex: 10}} onPress={goBackToLogin}>
                <FontAwesome style={{paddingTop: 50, paddingLeft: 25}} name="chevron-left" size={26} color="white" />
            </TouchableOpacity>
            <LoginSkeleton title='Sing Up!'>
                <View style={{flex: 1, width: '100%'}}>
                    <Text
                    style={styles.text}
                    >
                        Looks like you don't have an account.{'\n'}Let's create one!
                    </Text>
                    <RegisterSreenRenderForm
                        handleRegistration={handleRegistration}
                        formSchema={formSchema}
                    />
                </View>
            </LoginSkeleton>
        </View>
    );
}