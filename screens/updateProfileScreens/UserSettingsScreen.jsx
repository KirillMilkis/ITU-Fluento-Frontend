/*
 * File: UserSettingsScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserInfo, updateUserProfile } from '../../api';
import styles from './updateProfileMain.styles';
import config from '../../config/config';
import Slider from '@react-native-community/slider';

const UserSettingsScreen = ({ route }) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [selectedLanguageLevel, setSelectedLanguageLevel] = useState('');
    const [dailyGoal, setDailyGoal] = useState(5);
    const [popupMessage, setPopupMessage] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));

    // Fetch user info on mount
    const fetchInfo = async () => {
        try {
            const result = await getUserInfo('Alice');
            setUserInfo(result);

            if (!newUsername) {
                setNewUsername(result.username);
            }
            setSelectedLanguageLevel(result.languageLevel);
        }
        catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []); // Only fetch once on mount

    useFocusEffect(
        useCallback(() => {
            fetchInfo();
        }, []),
    );

    const handleSave = async () => {
        try {
            const result = await updateUserProfile('Alice', newUsername, null, null, selectedLanguageLevel, dailyGoal);
            if (result.success) {
                navigation.goBack();
            } else {
                showPopup(result.message);
            }
        }
        catch (error) {
            showPopup(error.message || 'An unexpected error occurred');
        }
    };

    const showPopup = (message) => {
        setPopupMessage(message);
        fadeAnim.setValue(0);

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }, 2000);
    };

    return (
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.spacing}>
                    <Icon name='arrow-back-outline' size={38} color='black' />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.profileInfoContainer}>
                {userInfo ? (
                    <>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: `${config.IMAGE_URL}${userInfo.gender}/${userInfo.profileImage}`,
                                }}
                                style={styles.profileImageSmall}
                            />
                            <TouchableOpacity
                                style={styles.imageOverlay}
                                onPress={() =>
                                    navigation.navigate('AvatarChangeScreen', { username: userInfo.username, gender: userInfo.gender, profileImage: userInfo.profileImage })
                                }
                            >
                                <Text style={styles.overlayText}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.usernameSmall}>Name</Text>

                        <TextInput
                            style={styles.input}
                            placeholder='Enter new username'
                            value={newUsername}
                            onChangeText={setNewUsername}
                        />

                        <Text style={styles.sectionTitle}>Language Level</Text>
                        <View style={styles.languageGrid}>
                            {['A1', 'B1', 'C1', 'A2', 'B2', 'C2'].map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.languageButton,
                                        selectedLanguageLevel === level && styles.selectedLanguageButton,
                                    ]}
                                    onPress={() => setSelectedLanguageLevel(level)}
                                >
                                    <Text style={styles.languageButtonText}>{level}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Daily Goal</Text>
                        <Text style={styles.sliderText}>Lessons: {dailyGoal}</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            value={dailyGoal}
                            onValueChange={setDailyGoal}
                            minimumTrackTintColor='#51A687'
                            thumbTintColor='#000000'
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        {popupMessage && (
                            <Animated.View style={[styles.popupContainer, { opacity: fadeAnim }]}>
                                <Text style={styles.popupText}>{popupMessage}</Text>
                            </Animated.View>
                        )}
                    </>
                ) : (
                    <ActivityIndicator size='large' color='black' />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserSettingsScreen;