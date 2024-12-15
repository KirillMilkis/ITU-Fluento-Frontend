/*
 * File: CreateMultipleChoiceScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { createMultipleChoice, updateMultipleChoice, getQuestionById } from '../../api';
import QuestionInput from '../../components/questions/QuestionInput';
import styles from './questions.styles';
import { ImagePickerComponent } from '../../components';

const CreateMultipleChoiceScreen = ({ route }) => {
    const { quizId } = route.params;
    const navigation = useNavigation();
    const { id } = route.params || {};

    const [image, setImage] = useState(null);
    const [inputs, setInputs] = useState(Array(4).fill(''));
    const [questionInput, setQuestionInput] = useState('');
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch existing question if ID is provided
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getQuestionById(id)
                .then((data) => {
                    setQuestionInput(data.question || '');
                    setInputs([
                        data.optionA,
                        data.optionB,
                        data.optionC,
                        data.optionD,
                    ]);
                    let index =
                        data.answer == data.optionA
                            ? 0
                            : data.answer == data.optionB
                              ? 1
                              : data.answer == data.optionC
                                ? 2
                                : 3;
                    setSelected(index);
                    setImage(data.imagePath);
                })
                .catch((err) => {
                    console.error(
                        'Error fetching multiple choice question:',
                        err,
                    );
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

    const handleImageSelected = (image) => {
        setImage(image);
    };

    const handleButtonPress = (index) => {
        setSelected(index);
    };

    const handleContinue = async () => {
        const options = {
            optionA: inputs[0],
            optionB: inputs[1],
            optionC: inputs[2],
            optionD: inputs[3],
        };

        try {
            if (id) {
                // Update existing question
                await updateMultipleChoice(id, questionInput, image, inputs[selected], options);
            } else {
                // Create new question
                await createMultipleChoice(quizId, questionInput, image, inputs[selected], options);
            }
            navigation.navigate('NewQuizScreen', { quizId });
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
                <Text style={styles.headerTitle}>Multiple Choice Question</Text>
            </View>

            {/* Question Input */}
            <QuestionInput
                index={0}
                value={questionInput}
                onChangeText={handleQuestionInputChange}
                labelText='Enter question'
                placeholderText='Enter question'
            />

            <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }]}>
                Type the options
            </Text>

            <ImagePickerComponent
                initialImage={image}
                onImageSelected={(image) => handleImageSelected(image)}
            />

            {/* Input Grid */}
            <View style={styles.inputGrid}>
                {inputs.map((input, index) => (
                    <View
                        key={index}
                        style={[
                            styles.inputContainer,
                            { marginHorizontal: 30 },
                        ]}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder={`Option ${index + 1}`}
                            value={input}
                            onChangeText={(text) =>
                                handleInputChange(index, text)
                            } // Pass the index here
                        />
                    </View>
                ))}
            </View>

            <Text
                style={[
                    styles.text,
                    { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
                ]}
            >
                Choose correct answer
            </Text>

            {/* Button Grid */}
            <View style={styles.buttonGrid}>
                {inputs.map((input, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selected === index && styles.selectedOption,
                            index === selected && {
                                backgroundColor: '#4caf50',
                            },
                            { marginHorizontal: 20 },
                        ]}
                        onPress={() => handleButtonPress(index)}
                    >
                        {/* Trim button text if it's too long */}
                        <Text style={styles.optionText}>
                            {input?.length > 15
                                ? input.slice(0, 12) + '...'
                                : input || `Option ${index + 1}`}
                        </Text>
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

export default CreateMultipleChoiceScreen;