import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

export default function FormErrorMessage({ condition, message }) {

    return ( condition ? 
        <View style={{flexDirection: 'row'}}>
            <FontAwesome style={{marginRight: 5, marginLeft: 5}} name="exclamation-triangle" size={20} color="red" />
            <Text
                style={{
                    alignSelf: 'flex-start',
                    color: '#a7343b'
                }}
            >{message}</Text>
        </View>
        : 
        <></>
    );
}

FormErrorMessage.defaultProps = {
    condition: false,
    message: ''
}

FormErrorMessage.prototype = {
    condition: propTypes.bool.isRequired,
    message: propTypes.string.isRequired
}

