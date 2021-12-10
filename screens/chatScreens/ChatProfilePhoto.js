import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import ProfilePhotoCamera from './components/ProfilePhotoCamera';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import { useDispatch } from 'react-redux';
import { updateProfilePhoto } from '../../redux/userSlice';

const dimensions = Dimensions.get("window");
const screenWidth = dimensions.width;
const height = Math.round((screenWidth * 4) / 3);

export default function ChatProfilePhoto() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cameraRef = useRef(null);
    const [showCamera, setShowCamera] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [flashMode, setFlasMode] = useState(Camera.Constants.FlashMode.off);
    const [selfie, setSelfie] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (!cameraRef) return;
        if (loading) return;
        let photo = null;
        try{
            setLoading(true);
            photo = await cameraRef.current.takePictureAsync({
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
                base64: true
            });
        } catch (e) {
            setLoading(false);
        }
        setLoading(false);
        if (photo === null) return;
        setSelfie(photo);
        setShowCamera(false);
    }

    const flipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
    }

    const toggleFlash = () => {
        setFlasMode(
            flashMode === Camera.Constants.FlashMode.off
              ? Camera.Constants.FlashMode.on
              : Camera.Constants.FlashMode.off
        );
    }

    const toggleShowCamera = () => {
        setShowCamera(
            showCamera === false
             ? true
             : false
        );
    }

    const uploadImage = async () => {
        const ext = selfie.uri.substring(selfie.uri.lastIndexOf('.') + 1);
        data = {
            image: selfie.base64,
            ext
        }
        dispatch(updateProfilePhoto(data));
        goBack();
    }

    const goBack = () => {
        navigation.goBack();
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (showCamera === true) {
        return <ProfilePhotoCamera
            loading={loading}
            goBack={goBack}
            toggleFlash={toggleFlash}
            takePhoto={takePhoto}
            flipCamera={flipCamera}
            type={type}
            flashMode={flashMode}
            cameraRef={cameraRef}
            height={height}
            screenWidth={screenWidth}
        />
    } 
    return <ProfilePhotoUpload 
        toggleShowCamera={toggleShowCamera}
        uploadImage={uploadImage}
        height={height}
        screenWidth={screenWidth}
        selfie={selfie}
    />
}