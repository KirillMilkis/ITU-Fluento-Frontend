import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllQuizzes, greetUser, getUserInfo, getQuizLevels } from '../../api';
import QuizTile from '../../components/quizzes/QuizTile';
import styles from './quizMain.styles';
import config from '../../config/config';

const AllQuizzesScreen = ({ route }) => {
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [quizLevels, setQuizLevels] = useState([]);

    const fetchQuizzes = async () => {
        try {
            const result = await getAllQuizzes('Alice');
            setQuizzes(result);
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
        }
    };

    const fetchGreeting = async () => {
        try {
            const response = await greetUser('Alice');
            setGreeting(response.message);
        } catch (error) {
            console.error("Failed to fetch greeting:", error);
        }
    };

    const fetchInfo = async () => {
        try {
            const result = await getUserInfo('Alice');
            setUserInfo(result);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    const fetchQuizLevels = async () => {
        try {
            const result = await getQuizLevels();
            setQuizLevels(result);
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
        fetchGreeting();
        fetchInfo();
        fetchQuizLevels();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchInfo();
        }, [userInfo])
    );

    const handleQuizClick = (quizID, quizTitle) => {
        navigation.navigate('GrammarScreen', { quizID: quizID, quizTitle: quizTitle});
        console.log(`Quiz with ID ${quizID} clicked`);
    };

    const handleLanguageLevelClick = (level) => {
        navigation.navigate('LevelQuizzesScreen', { level: level });
    };

    const handleAvatarClick = () => {
        navigation.navigate('UserProfileScreen', {username: 'Alice'});
    };

    return (
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <Text style={styles.greetingStyle}>{greeting}</Text>
                <TouchableOpacity onPress={() => handleAvatarClick()} style={[styles.spacing]}>
                    {userInfo && (
                        <Image
                        source={{
                            uri: `${config.IMAGE_URL}${userInfo.gender}/${userInfo.profileImage}`,
                        }}
                        style={styles.profileImage}
                        />
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.languageLevelRow}
            >
                {quizLevels.map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={styles.languageLevelButton}
                        onPress={() => handleLanguageLevelClick(level)}
                    >
                        <Text style={styles.languageLevelButtonText}>{level}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Quizzes List */}
            <ScrollView contentContainerStyle={styles.quizListContainer}>
                {quizzes.map((quiz, index) => (
                    <QuizTile
                        key={quiz.ID}
                        quiz={quiz}
                        index={index}
                        onClick={handleQuizClick}
                        style={index === 0 ? styles.quizContainerLarge : styles.quizContainerSmall}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllQuizzesScreen;
