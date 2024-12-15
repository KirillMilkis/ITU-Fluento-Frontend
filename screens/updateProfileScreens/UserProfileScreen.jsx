/*
 * File: UserProfileScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserInfo } from '../../api';
import styles from './updateProfileMain.styles';
import config from '../../config/config';
import { CollectionTile } from '../../components';
import { useFetch } from '../../api';

const UserProfileScreen = ({ route }) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);

    let url = `${config.API_URL}decks/getDecks/Alice`;
    const { data, isLoading, error } = useFetch(url);

    const fetchInfo = async () => {
        try {
            const result = await getUserInfo('Alice');
            setUserInfo(result);
        }
        catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchInfo();
        }, [userInfo])
    );

    return (
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.spacing}>
                    <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("UserSettingsScreen")} style={styles.spacing}>
                    <Icon name="settings-outline" size={38} color="black"/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfoContainer}>
                {userInfo ? (
                    <>
                        <View style={styles.imageAndNameContainer}>
                            <Image
                                source={{
                                    uri: `${config.IMAGE_URL}${userInfo.gender}/${userInfo.profileImage}`,
                                }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.username}>{userInfo.username}</Text>
                        </View>
                        <Text style={styles.languageLevelText}>Language Level: {userInfo.languageLevel}</Text>
    
                        <TouchableOpacity
                            style={styles.userQuizzesButton}
                            onPress={() => navigation.navigate("UserQuizzesScreen")}
                        >

                        </TouchableOpacity>
                    </>
                ) : (
                    <ActivityIndicator size="large" color="black" />
                )}
            </View>
    
            <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('UserQuizzesScreen', {username: 'Alice'})}
                >
                    <Text style={styles.buttonText}>View Your Quizzes</Text>
                    <Icon name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>

            <View style={styles.divider} />
    
            <Text style={styles.createdCollectionsText}>Created Collections</Text>
    
            <ScrollView>
                <View style={[styles.container, styles.spacing]}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#bbbbbb" />
                    ) : error ? (
                        <Text>Error: {error.message}</Text>
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <CollectionTile item={item} />}
                            keyExtractor={(item) => item.ID}
                            vertical
                            contentContainerStyle={{ gap: 14, alignItems: 'center' }}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserProfileScreen;
