/*
 * File: CreateTrueFalseScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import QuestionInput from '../../components/questions/QuestionInput';
import styles from './questions.styles';
import { createTrueFalse, getQuestionById, updateTrueFalse } from '../../api';

const TrueFalseScreen = ({ route }) => {
    const { quizId } = route.params;
    const navigation = useNavigation();

    const { id } = route.params || {};
    const [questions, setQuestions] = useState([
        { text: '', selectedAnswer: 'True' },
        { text: '', selectedAnswer: 'True' },
        { text: '', selectedAnswer: 'True' },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch existing questions if ID is provided
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getQuestionById(id)
                .then((data) => {
                    // Parse the response correctly
                    const loadedQuestions = [
                        {
                            text: data.q1 || '',
                            selectedAnswer: data.a1 === 1 ? 'True' : 'False',
                        },
                        {
                            text: data.q2 || '',
                            selectedAnswer: data.a2 === 1 ? 'True' : 'False',
                        },
                        {
                            text: data.q3 || '',
                            selectedAnswer: data.a3 === 1 ? 'True' : 'False',
                        },
                    ];

                    setQuestions(loadedQuestions);
                })
                .catch((err) => {
                    console.error('Error fetching questions:', err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    // Handle question text change
    const handleQuestionChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    // Handle answer change
    const handleAnswerChange = (index, answer) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].selectedAnswer = answer;
        setQuestions(updatedQuestions);
    };

    // Handle Save
    const handleSave = async () => {
        // Ensure the questions are formatted correctly
        const preparedQuestions = questions.reduce((acc, question, index) => {
            const questionNumber = index + 1;
            acc[`q${questionNumber}`] = question.text || 'Default';
            acc[`a${questionNumber}`] = question.selectedAnswer === 'True' ? '1' : '0';
            return acc;
        }, {});

        try {
            if (id) {
                // Update existing questions
                await updateTrueFalse(id, preparedQuestions);
            } else {
                // Create new questions
                await createTrueFalse(quizId, preparedQuestions);
            }
            navigation.navigate('NewQuizScreen', { quizId: quizId });
        }
		catch (err) {
            console.error('Error saving questions:', err);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='blue' />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back-outline' size={38} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {id
                        ? 'Update True/False Question'
                        : 'Create True/False Question'}
                </Text>
            </View>

            {/* Loop for three questions */}
            {questions.map((question, index) => (
                <View key={index}>
                    <QuestionInput
                        index={index}
                        value={question.text}
                        onChangeText={(i, text) =>
                            handleQuestionChange(index, text)
                        }
                    />

                    {/* Answer Options */}
                    <Text style={[styles.label, { fontSize: 20 }]}>
                        Choose correct answer for question {index + 1}
                    </Text>
                    <View style={styles.optionsContainerTF}>
                        <TouchableOpacity
                            style={[
                                styles.optionButtonTF,
                                question.selectedAnswer === 'True' &&
                                    styles.selectedOptionTF,
                            ]}
                            onPress={() => handleAnswerChange(index, 'True')}
                        >
                            <Text style={styles.optionText}>True</Text>
                            {question.selectedAnswer === 'True' && (
                                <Icon
                                    name='checkmark-circle'
                                    size={20}
                                    color='green'
                                    style={styles.checkIcon}
                                />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.optionButtonTF,
                                question.selectedAnswer === 'False' &&
                                    styles.falseSelectedOptionTF,
                            ]}
                            onPress={() => handleAnswerChange(index, 'False')}
                        >
                            <Text style={styles.optionText}>False</Text>
                            {question.selectedAnswer === 'False' && (
                                <Icon
                                    name='checkmark-circle'
                                    size={20}
                                    color='red'
                                    style={styles.checkIcon}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.text}>
                    {id ? 'Update Question' : 'Create Question'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TrueFalseScreen;