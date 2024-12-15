/*
 * File: CreateFillInScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import QuestionInput from '../../components/questions/QuestionInput';
import { ImagePickerComponent } from '../../components';
import styles from './questions.styles';
import { createFillInBlank, getQuestionById, updateFillInBlank } from '../../api';

const CreateFillInScreen = ({ route }) => {
    const { quizId } = route.params;
    const navigation = useNavigation();
    const { id } = route.params || {};
    const placeholder = 'Write the correct item names below';

    const [pairs, setPairs] = useState([
        { text: '', image: null },
        { text: '', image: null },
        { text: '', image: null },
        { text: '', image: null },
    ]);
    const [questionInput, setQuestionInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch existing question if ID is provided
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getQuestionById(id)
                .then((data) => {
                    setQuestionInput(data.description || '');
                    const loadedPairs = [
                        { text: data.a1 || '', image: data.i1 || null },
                        { text: data.a2 || '', image: data.i2 || null },
                        { text: data.a3 || '', image: data.i3 || null },
                        { text: data.a4 || '', image: data.i4 || null },
                    ];
                    setPairs(loadedPairs);
                })
                .catch((err) => {
                    console.error('Error fetching question:', err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    const handleTextChange = (index, text) => {
        const updatedPairs = [...pairs];
        updatedPairs[index].text = text;
        setPairs(updatedPairs);
    };

    const handleImageSelected = (index, image) => {
        const updatedPairs = [...pairs];
        updatedPairs[index].image = image;
        setPairs(updatedPairs);
    };

    const handleQuestionInputChange = (index, text) => {
        setQuestionInput(text);
    };

    const handleContinue = async () => {
        const question = questionInput || placeholder;
        const preparedData = {};

        pairs.forEach((pair, index) => {
            preparedData[`a${index + 1}`] = pair.text;
            preparedData[`i${index + 1}`] = pair.image;
        });

        try {
            if (id) {
                // Update existing question
                await updateFillInBlank(id, {
                    question,
                    options: preparedData,
                });
            } else {
                // Create new question
                await createFillInBlank(quizId, question, preparedData);
            }
            navigation.navigate('NewQuizScreen', { quizId: quizId });
        } catch (err) {
            console.error('Error saving question:', err);
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
                        ? 'Update Image Recognition'
                        : 'Create Image Recognition'}
                </Text>
            </View>

            {/* Question Input */}
            <QuestionInput
                labelText='Type question descripiton'
                value={questionInput}
                onChangeText={handleQuestionInputChange}
                placeholderText={placeholder}
            />

            {/* Input and Image Rows */}
            {pairs.map((pair, index) => (
                <View
                    key={index}
                    style={[
                        styles.rowContainer,
                        { marginVertical: 10, marginHorizontal: 40 },
                    ]}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder={`Enter text for pair ${index + 1}`}
                        value={pair.text}
                        onChangeText={(text) => handleTextChange(index, text)}
                    />
                    <ImagePickerComponent
                        initialImage={pair.image}
                        onImageSelected={(image) =>
                            handleImageSelected(index, image)
                        }
                    />
                </View>
            ))}

            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.text}>
                    {id ? 'Update Question' : 'Create Question'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateFillInScreen;
