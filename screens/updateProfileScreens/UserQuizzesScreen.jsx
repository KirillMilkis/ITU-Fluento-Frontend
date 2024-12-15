/*
 * File: UserQuizzesScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getQuizzesByUser } from '../../api';
import QuizTile from '../../components/quizzes/QuizTile';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './updateProfileMain.styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import config from '../../config/config';

const UserQuizzesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [quizzes, setQuizzes] = useState([]);

    const fetchQuizzesByLevel = async () => {
        try {
            const result = await getQuizzesByUser('Alice');
            setQuizzes(result);
        }
        catch (error) {
            console.error("Failed to fetch quizzes:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchQuizzesByLevel();
        }, [])
    );

    const handleQuizClick = (quizID, quizTitle) => {
        navigation.navigate('GrammarScreen', { quizID: quizID, quizTitle: quizTitle });
    };

    const handleNewQuizClick = () => {
        navigation.navigate('NewQuizScreen');
    };

    const handleEditQuizClick = (quizId) => {
        navigation.navigate('NewQuizScreen', { quizId: quizId });
    };

    return (
        <View style={{ flex: 1,}}>


            <View style={[styles.topBarContainer, { paddingTop: 40 }]}> 
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.spacing]}>
                    <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 28 }}>Your quizzes</Text>
                <Icon name="arrow-back-outline" size={38} color="transparent" />
            </View>



            <ScrollView contentContainerStyle={styles.quizListContainer}>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <View key={quiz.ID} style={styles.quizContainerSmall}>
                            <View style={styles.quizTileContainer}>
                                <QuizTile
                                    quiz={quiz}
                                    index={index}
                                    style={styles.quizTile}
                                    onClick={handleQuizClick}
                                />
                                <TouchableOpacity
                                    onPress={() => handleEditQuizClick(quiz.ID)}
                                    style={styles.editButton}
                                >
                                    <Icon name="create-outline" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text></Text>
                )}
<<<<<<< HEAD

                
=======
                <View key={99999} style={styles.quizContainerSmall}>
                    <View style={styles.quizTileContainer}>
                        <TouchableOpacity onPress={handleNewQuizClick} style={[styles.quizContainer]}>
                            <Image 
                                source={{ uri: `${config.IMAGE_URL}new.png` }}
                                style={styles.quizImage} 
                            />
                        
                            <Text style={styles.quizTitle}>
                            Create new quiz
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

>>>>>>> 52a6e362f3ef1bb5b75f727c45480dd67636dfa5
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1 }}>
                <TouchableOpacity 
                    style={styles.floatingButton} 
                    onPress={handleNewQuizClick}
                >
                    <Icon name="add" size={30} color="white" />
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default UserQuizzesScreen;
