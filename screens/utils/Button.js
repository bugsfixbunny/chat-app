import React from "react";
import propTypes from 'prop-types';
import { TouchableOpacity, Text } from "react-native";

export default function Button({
    onPress, 
    title, 
    textColor, 
    textPadding,
    margin, 
    padding, 
    backgroundColor,
    alingButton,
    alignSelf,
    fontWeight
}) {
    return (
        <TouchableOpacity
            style={{
                margin: margin,
                borderRadius: 7,
                padding: padding,
                justifyContent: 'center',
                alignSelf: alingButton,
                backgroundColor: backgroundColor
            }}
            onPress={onPress}
        >
            <Text 
                style={{
                    alignSelf: alignSelf,
                    color: textColor,
                    padding: textPadding,
                    fontWeight: fontWeight
                }}
            >{title}</Text>
        </TouchableOpacity>
    );
}

Button.defaultProps = {
    onPress: () => console.log('default function'),
    title: 'title',
    textColor: '#e8eaed',
    textPadding: 5,
    backgroundColor: '#5d3fd3',
    padding: 5,
    margin: 0,
    alingButton: 'auto',
    alignSelf: 'center',
    fontWeight: '700',
}


Button.propTypes = {
    onPress: propTypes.func.isRequired,
    textColor: propTypes.string,
    textPadding: propTypes.number,
    backgroundColor: propTypes.string,
    padding: propTypes.number,
    margin: propTypes.number,
    alingButton: propTypes.string,
    alignSelf: propTypes.string,
    fontWeight: propTypes.string
}