/*
 * File: ImagePickerComponent.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note:
 */
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import config from '../../config/config';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './imagePickerComponent.styles';
import { uploadFile } from '../../api';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ initialImage, onImageSelected }) => {
    const [image, setImage] = useState(
        initialImage !== null ? `${config.IMAGE_URL}${initialImage}` : null,
    );

    const handleImageUpload = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission required',
                'Permission to access media library is required!',
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const uploadedImage = result.assets[0].uri;
            const newName = await uploadFile(uploadedImage);

            setImage(`${config.IMAGE_URL}${newName}`);
            onImageSelected(newName);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        onImageSelected(null);
    };

    return (
        <View>
            {image ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.removeImage}
                        onPress={handleImageRemove}
                    >
                        <Icon name='close-circle' size={24} color='red' />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.imageUploadButton}
                    onPress={handleImageUpload}
                >
                    <Icon name='add' size={40} color='blue' />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ImagePickerComponent;