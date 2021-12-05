import React from "react";
import { ActivityIndicator, Text, View } from 'react-native';

export default function Loading({ loaded, backgroundColor, title }) {
    return (
        <View style={[{
            backgroundColor: backgroundColor,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        }, {
            display: loaded ? 
            'none' 
            :
            'flex'
        }]}>
            <ActivityIndicator size={65} color="#5d3fd3" />
            <Text style={{color: '#5d3fd3', padding: 10}}>{title}</Text>
        </View>
    );
}

Loading.defaultProps = {
    loaded: false,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    title: null
}