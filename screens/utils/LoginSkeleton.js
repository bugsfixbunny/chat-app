import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

export default function LoginSkeleton({ children, title }) {

    const [loaded, setLoaded] = useState(false);

    return (
        <View style={[styles.mainContainer]}>
            <ImageBackground
                onLoadEnd={() => setLoaded(true)}
                blurRadius={2} 
                style={[styles.ImageBackground]} 
                source={require('../../assets/login-screen-bg.png')}
            >
                <View style={styles.container}>
                    <Text style={styles.helcomingMessage}>{title}</Text>
                    <View style={styles.formContainer}>
                        {children}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    helcomingMessage: {
        color: '#e8eaed',
        alignSelf: 'flex-start',
        margin: 25,
        fontSize: 25,
        fontWeight: '700'
    }, 
    formContainer: {
        height: '60%',
        width: '95%',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        borderRadius: 5,
        justifyContent:'space-between'
    },
});

LoginSkeleton.defaultProps = {
    title: 'title',
    children: null
}