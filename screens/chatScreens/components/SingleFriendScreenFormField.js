import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useSocketsHandler from '../../../sockets/useSocketsHandler';

export default function SingleFriendScreenFormField({ friendId }) {

    const [messageForm, setMessageForm] = useState('');

    const sockets = useSocketsHandler();

    const sendMessage = () => {
        sockets('private message', { message: messageForm, friendId });
        setMessageForm('');
    }
 
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={messageForm}
                onChangeText={val => setMessageForm(val)}
                placeholder='Messages'
                placeholderTextColor='#b1a9c6'
                multiline={true}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.button}>
                <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        minHeight: 75,
        overflow: 'hidden',
        maxHeight: 150,
        margin: 15,
        marginTop: 5,
        backgroundColor: '#ece6fc'
    },
    button: {
        borderRadius: 50,
        padding: 10,
        marginRight: 5,
        backgroundColor: '#5d3fd3',
        alignItems: 'flex-end',
        
    },
    textInput: {
        fontFamily: 'ShipporiAntique-Regular',
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 20
    }
});