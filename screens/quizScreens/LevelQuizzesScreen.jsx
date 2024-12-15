/*
 * File: LevelQuizzesScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getQuizzesByLevel } from '../../api';
import QuizTile from '../../components/quizzes/QuizTile';
import styles from './quizMain.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const LevelQuizzesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { level } = route.params;
    const [quizzes, setQuizzes] = useState([]);

    const fetchQuizzesByLevel = async () => {
        try {
            const result = await getQuizzesByLevel(level.split(' ')[0]);
            setQuizzes(result);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    };

    useEffect(() => {
        fetchQuizzesByLevel();
    }, []);

    const handleQuizClick = (quizID, quizTitle) => {
        navigation.navigate('GrammarScreen', { quizID: quizID, quizTitle: quizTitle });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.topBarContainer, { paddingTop: 40 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.spacing]}>
                    <Icon name='arrow-back-outline' size={38} color='black' />
                </TouchableOpacity>

                <Text style={[styles.courseLevelStyle]}>{level}</Text>

                <Icon name='arrow-back-outline' size={38} color='transparent' />
            </View>

            <ScrollView contentContainerStyle={styles.quizListContainer}>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <QuizTile
                            key={quiz.ID}
                            quiz={quiz}
                            index={index}
                            style={styles.quizContainerSmall}
                            onClick={handleQuizClick}
                        />
                    ))
                ) : (
                    <Text>No quizzes available for this level.</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default LevelQuizzesScreen;