import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'; 
import styles from '../styles/ProfilePhotoCameraStyles';
import Loading from '../../utils/Loading';


export default function ProfilePhotoCamera({ 
    goBack,
    toggleFlash,
    takePhoto,
    flipCamera,
    type,
    cameraRef,
    flashMode,
    loading,
    height,
    screenWidth
}) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons style={styles.icon} name="arrow-back-sharp" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <Camera
                ratio='4:3'
                ref={cameraRef}
                style={{
                    height: height,
                    width: screenWidth,
                }} 
                type={type}
                flashMode={flashMode}
            >
                <Loading 
                    loaded={!loading}
                    backgroundColor='black'
                    title='Processing picture...'
                />
            </Camera>
            <View style={[styles.innerContainer, styles.innerContainerBottom]}>
                <TouchableOpacity onPress={flipCamera}>
                    <Ionicons style={styles.icon} name="camera-reverse" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto}>
                    <Ionicons style={styles.icon} name="radio-button-on" size={90} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFlash}>
                    <Ionicons style={styles.icon} name={flashMode ? 'flash' : 'flash-off'} size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}