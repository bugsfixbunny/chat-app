import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

export default function Loading({ loaded }) {
    return (
        <View style={[styles.container, {display: loaded ? 'none' : 'flex'}]}>
            <ActivityIndicator size="large" color="#5d3fd3" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
      }
});

Loading.defaultProps = {
    loaded: false
}