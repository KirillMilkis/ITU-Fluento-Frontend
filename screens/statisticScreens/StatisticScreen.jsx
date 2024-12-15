/*
 * File: StatisticScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserProgress } from '../../api';
import styles from './statisticScreen.styles';

const StatisticScreen = ({ route }) => {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(null);

    const fetchProgress = async () => {
        try {
            const result = await getUserProgress('Alice');
            setProgress(result);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProgress();
        }, [progress]),
    );

    if (!progress) {
        return null;
    }

    const days = Object.keys(progress.quizzesCompleted);

    const getDayBoxStyle = (completed, goal) => {
        const percentage = (completed / goal) * 100;
        if (percentage > 80) {
            return { backgroundColor: '#4CAF50' };
        } else if (percentage > 30) {
            return { backgroundColor: '#FFA726' };
        } else {
            return { backgroundColor: '#E57373' };
        }
    };

    const values = Object.values(progress.quizzesCompleted);
    const lastValue = values[values.length - 1];
    const todayPercentage = (lastValue / progress.dailyGoal) * 100;
    const todayStyle = getDayBoxStyle(lastValue, progress.dailyGoal);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.headerText}>Statistic</Text>

                <TouchableOpacity
                    style={styles.leaderboardButton}
                    onPress={() => navigation.navigate('LeaderboardScreen', { username: 'Alice' })}
                >
                    <Text style={styles.leaderboardText}>Leaderboard</Text>
                    <Icon name='chevron-forward' size={20} color='#000' />
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Week activity</Text>
                    <View style={styles.weekActivity}>
                        {days.map((day) => {
                            const completed = progress.quizzesCompleted[day];
                            const goal = progress.dailyGoal;
                            return (
                                <View key={day} style={[styles.dayBox, getDayBoxStyle(completed, goal)]}>
                                    <Text style={styles.dayText}>{day}</Text>
                                    <Text style={styles.dayQuizzes}>
                                        {completed}/{progress.dailyGoal}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.todayProgressContainer}>
                        <Icon name='sunny-outline' size={20} color='#000' />
                        <Text style={styles.todayText}>Today</Text>
                    </View>
                    <View style={[styles.progressBar, todayStyle]}>
                        <View style={[styles.progress, { width: `${todayPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {lastValue}/{progress.dailyGoal}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Correctness</Text>
                    <View style={styles.correctnessChart}>
                        <View
                            style={[styles.chartSegment, { backgroundColor: '#4CAF50', flex: progress.correctPercentage / 100 }]}
                        />
                        <View
                            style={[styles.chartSegment, { backgroundColor: '#E57373', flex: progress.grammarPercentage / 100 }]}
                        />
                        <View
                            style={[styles.chartSegment, { backgroundColor: '#64B5F6', flex: progress.vocabularyPercentage / 100 }]}
                        />
                    </View>

                    <View style={styles.legend}>
                        <View style={styles.legendRow}>
                            <View style={styles.legendColorGreen}></View>
                            <Text style={styles.legendText}>Correct</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <View style={styles.legendColorRed}></View>
                            <Text style={styles.legendText}>Grammar mistakes</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <View style={styles.legendColorBlue}></View>
                            <Text style={styles.legendText}>Vocabulary mistakes</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatisticScreen;
