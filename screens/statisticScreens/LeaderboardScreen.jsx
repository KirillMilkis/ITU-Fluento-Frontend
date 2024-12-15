/*
 * File: LeaderboardScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import config from '../../config/config';
import styles from './leaderboardScreen.styles';

const LeaderboardScreen = (username) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`${config.API_URL}leaderboard/${username}`);
            const data = response.data;

            setLeaderboardData(data.leaderboard);
            setUserPosition(data.userPosition + 1);
        } catch (error) {
            console.error('Failed to fetch leaderboard data:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.position}>{index + 1}</Text>
            <Image
                source={{ uri: `${config.IMAGE_URL}${item.gender}/${item.profileImage}` }}
                style={styles.profileImage}
            />
            <Text style={styles.username}>{item.username}</Text>
        </View>
    );

    const getPositionSuffix = (position) => {
        const lastDigit = position % 10;
        const lastTwoDigits = position % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return 'st';
        } else if (lastDigit === 2 && lastTwoDigits !== 12) {
            return 'nd';
        } else if (lastDigit === 3 && lastTwoDigits !== 13) {
            return 'rd';
        } else {
            return 'th';
        }
    };

    const suffix = getPositionSuffix(userPosition);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <Text style={styles.positionText}>
                You are on the{' '}
                <Text style={styles.userPosition}>
                    {userPosition}
                    {suffix}
                </Text>{' '}
                position
            </Text>
            <View style={styles.listContainer}>
                <FlatList
                    data={leaderboardData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

export default LeaderboardScreen;
