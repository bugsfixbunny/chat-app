import React from 'react';
import { View, Image } from 'react-native';
import Button from '../../utils/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePhotoUpload({ 
    toggleShowCamera,
    uploadImage,
    height,
    screenWidth,
    selfie
}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
            <Image
                style={{height: height, width: screenWidth}}
                source={{uri: selfie.uri}}
            />
            <View style={{flexDirection: 'row'}}>
                <Button
                    onPress={uploadImage}
                    margin={10}
                    title={<Ionicons name="cloud-upload" size={24} color="white" />}
                />
                <Button
                    onPress={toggleShowCamera}
                    margin={10}
                    title='Take another photo'
                />
            </View>
        </View>
    );
}