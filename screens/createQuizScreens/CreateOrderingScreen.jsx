/*
 * File: CreateOrderingScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import QuestionInput from '../../components/questions/QuestionInput';
import styles from './questions.styles';
import { createWordOrdering, getQuestionById, updateWordOrdering } from '../../api';

const CreateOrderingScreen = ({ route }) => {
    const { quizId, id } = route.params || {};
    const navigation = useNavigation();
    const placeholder = 'Put the words in the correct order';

    // Initialize state for inputs, question text, order, and selection
    const [inputs, setInputs] = useState(Array(6).fill(''));
    const [questionInput, setQuestionInput] = useState('');
    const [order, setOrder] = useState(Array(6).fill(null));
    const [selected, setSelected] = useState(Array(6).fill(false));

    // Fetch existing question data if `id` is provided
    useEffect(() => {
        if (id) {
            getQuestionById(id)
                .then((data) => {
                    setQuestionInput(data.questionsText);
                    const updatedInputs = Array(6).fill('');
                    const updatedOrder = Array(6).fill(null);
                    const updatedSelected = Array(6).fill(false);
                    const options = data.options
                        .split(',')
                        .map((item) => item.trim());

					options.forEach((option, index) => {
                        updatedInputs[index] = option;
                        updatedOrder[index] = index + 1;
                        updatedSelected[index] = true;
                    });

                    setInputs(updatedInputs);
                    setOrder(updatedOrder);
                    setSelected(updatedSelected);
                })
                .catch((err) => {
                    console.error('Error fetching question:', err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    const handleQuestionInputChange = (index, text) => {
        setQuestionInput(text);
    };

    const handleInputChange = (index, text) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = text;
        setInputs(updatedInputs);
    };

    const handleButtonPress = (index) => {
        const newOrder = [...order];
        const newSelected = [...selected];
        const oldOrder = newOrder[index];

        if (newSelected[index]) {
            // Unselecting
            newOrder[index] = null;
            newSelected[index] = false;
            const updatedOrder = newOrder.map((orderNum) => {
                if (orderNum && orderNum > oldOrder) {
                    return orderNum - 1;
                }
                return orderNum;
            });
            setOrder(updatedOrder);
            setSelected(newSelected);
        } else {
            // Selecting
            let availableOrder = Math.max(
                ...newOrder.filter((orderNum) => orderNum !== null),
            );
            availableOrder = availableOrder === -Infinity ? 0 : availableOrder;

            newOrder[index] = availableOrder + 1;
            newSelected[index] = true;
            setOrder(newOrder);
            setSelected(newSelected);
        }
    };

    const handleContinue = async () => {
        const options = order
            .map((orderNum, idx) => {
                if (orderNum) {
                    return {
                        optionText: inputs[idx],
                        correctOrder: orderNum,
                    };
                }
                return null;
            })
            .filter((option) => option !== null);
        if (id) {
            // Update existing question
            await updateWordOrdering(id, questionInput || placeholder, options);
        } else {
            // Create new question
            await createWordOrdering(quizId, questionInput || placeholder, options);
        }

        navigation.navigate('NewQuizScreen', { quizId });
    };

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
                <Text style={styles.headerTitle}>Ordering Question</Text>
            </View>

            <QuestionInput
                value={questionInput}
                onChangeText={handleQuestionInputChange}
                labelText='Type the question'
                placeholderText={placeholder}
            />

            <Text style={styles.text}>Type possible answers</Text>

            {/* Input Grid */}
            <View style={styles.inputGrid}>
                {inputs.map((input, index) => (
                    <View
                        key={index}
                        style={[
                            styles.inputContainer,
                            { marginHorizontal: 35 },
                        ]}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder={`Text ${index + 1}`}
                            value={input}
                            onChangeText={(text) =>
                                handleInputChange(index, text)
                            }
                        />
                    </View>
                ))}
            </View>

            <Text style={styles.text}>Choose Correct Order</Text>

            {/* Button Grid */}
            <View style={styles.buttonGrid}>
                {inputs.map((input, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selected[index] && styles.selectedOption,
                            order[index] !== null && {
                                backgroundColor: '#4caf50',
                            },
                            { marginHorizontal: 35 },
                        ]}
                        onPress={() => handleButtonPress(index)}
                    >
                        <Text style={styles.optionText}>
                            {input.length > 15
                                ? input.slice(0, 12) + '...'
                                : input || `Text ${index + 1}`}
                        </Text>
                        {order[index] !== null && (
                            <Text style={styles.orderText}>{order[index]}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateOrderingScreen;
