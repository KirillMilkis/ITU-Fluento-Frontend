import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../config/config';
import { updateUserProfile } from '../../api';
import styles from './avatarChangeScreen.styles'

const AvatarChangeScreen = ({ route, navigation }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [gender, setGender] = useState(route.params.gender || 'female');

    useEffect(() => {
        if (route.params.profileImage) {
            const avatarId = parseInt(route.params.profileImage.replace('.png', ''));
            setSelectedAvatar(avatarId);
        }
    }, [route.params.selectedAvatar]);

    const handleAvatarSelect = (id) => {
        setSelectedAvatar(id);
    };

    const handleGenderToggle = (newGender) => {
        setGender(newGender);
    };

    const handleSave = async () => {
        try {
            const result = await updateUserProfile('Alice', null, selectedAvatar, gender, null, null);
            
            navigation.goBack();
        } catch (error) {
            console.error("Failed to save avatar:", error);
        }
    };

    const renderAvatar = (id) => {
        const isSelected = selectedAvatar === id;
        return (
            <TouchableOpacity onPress={() => handleAvatarSelect(id)} style={styles.spacing}>
                <View style={[styles.imageContainer, isSelected ? styles.selectedImage : '']}>
                    <Image
                        source={{
                            uri: `${config.IMAGE_URL}${gender}/${id}.png`
                        }}
                        style={styles.avatarImage}
                    />
                    {isSelected && (
                        <View style={styles.selectedIcon}>
                            <Icon name="checkmark-circle" size={32} color="green" />
                        </View>
                    )}
                    {isSelected && <View style={styles.greenFilter}></View>}
                </View>
            </TouchableOpacity>
        );
    };

    const avatarIds = [1, 2, 3, 4, 5, 6];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.spacing}>
                    <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>

                <Text style={[{ fontSize: 24 }, styles.topBarText]}>Change avatar</Text>

                <Icon name="settings-outline" size={38} color="transparent" />
            </View>

            <View style={styles.avatarGrid}>
                {avatarIds.map((id) => renderAvatar(id))}
            </View>

            <View style={styles.genderToggleContainer}>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 'female' && styles.selectedGenderButton]}
                    onPress={() => handleGenderToggle('female')}
                >
                    <Text style={styles.genderButtonText}>Female Avatars</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 'male' && styles.selectedGenderButton]}
                    onPress={() => handleGenderToggle('male')}
                >
                    <Text style={styles.genderButtonText}>Male Avatars</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.saveButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default AvatarChangeScreen;
