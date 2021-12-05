import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MainScreenSearchBarStyles';

export default function MainScreenSearchBar() {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholderTextColor='grey'
                placeholder='Search here'
            />
            <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={24} color="#5d3fd3"/>
            </TouchableOpacity>
        </View>
    );
}