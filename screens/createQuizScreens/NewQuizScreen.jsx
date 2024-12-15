/*
 * File: NewQuizScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { createQuiz, deleteQuestion, getQuizById, updateQuiz, uploadFile } from '../../api';
import * as ImagePicker from 'expo-image-picker';
import styles from './newQuizScreen.styles';
import config from '../../config/config';
import { useFocusEffect } from '@react-navigation/native';

const NewQuizScreen = ({ navigation, route }) => {
    const [quizName, setQuizName] = useState('');
    const [image, setImage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [quizId, setQuizId] = useState(route?.params?.quizId || null);
    const [grammar, setGrammar] = useState(route?.params?.grammar || null);

    useFocusEffect(
        useCallback(() => {
            if (quizId) {
                fetchQuizData();
                fetchQuestions();
            }
        }, [quizId]),
    );

    const fetchQuestions = async () => {
        try {
            let data = await getQuizById(quizId);

            const uniqueQuestions = data.filter((question, index, self) => {
                if (!question.questionText || question.questionText.trim() === '') {
                    return false;
                }

                return index === self.findIndex((q) => q.ID === question.ID);
            });

            setQuestions(uniqueQuestions);
        }
		catch (error) {
            console.error('Error fetching questions', error);
        }
    };
    const fetchQuizData = async () => {
        try {
            var data = await getQuizById(quizId);
            data = data[0];
            setQuizName(data.title);
            setImage(`${config.IMAGE_URL}${data.photo}`);
        }
		catch (error) {
            console.error('Error fetching quiz data', error);
        }
    };

    const sendUpdateRequest = async () => {
        try {
            if (quizId) {
                // If editing an existing quiz, update it
                await updateQuiz(quizId, quizName, image);
            } else {
                // If creating a new quiz, create it
                newQuizId = await createQuiz(quizName, image);
                setQuizId(newQuizId);
            }
        }
		catch (error) {
            console.error('Error updating or creating quiz', error);
        }
    };

    const handleImageRemove = () => setImage(null);

    const handleEditQuestion = (question) => {
        let screenName = '';
        if (question.type === 'trueFalse') {
            screenName = 'CreateTrueFalseScreen';
        } else if (question.type === 'multipleChoice') {
            screenName = 'CreateMultipleChoiceScreen';
        } else if (question.type === 'matchingQuestions') {
            screenName = 'CreateMatchPairsScreen';
        } else if (question.type === 'orderingQuestions') {
            screenName = 'CreateOrderingScreen';
        } else if (question.type === 'fillInBlank') {
            screenName = 'CreateFillInScreen';
        }
        navigation.navigate(screenName, { id: question.ID });
    };

    const handleDeleteQuestion = async (item) => {
        try {
            setQuestions((prevQuestions) =>
                prevQuestions.filter((q) => q.ID !== item.ID),
            );

            await deleteQuestion(item.ID, item.type);
            await fetchQuestions();
        }
		catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleAddQuestion = async () => {
        if (quizId) {
            navigation.navigate('NewQuestionScreen', { quizId });
        } else {
            // Create a new quiz and navigate with the new quizId
            try {
                const newQuizId = await createQuiz(quizName, image);
                setQuizId(newQuizId);
                navigation.navigate('NewQuestionScreen', { quizId: newQuizId });
            }
			catch (error) {
                console.error('Error creating new quiz', error);
            }
        }
    };

    const handleAddGrammar = async () => {
        if (quizId) {
            navigation.navigate('CreateGrammarScreen', { quizId });
        } else {
            // Create a new quiz and navigate with the new quizId
            try {
                const newQuizId = await createQuiz(quizName, image);
                setQuizId(newQuizId);
                navigation.navigate('CreateGrammarScreen', {
                    quizId: newQuizId,
                });
            }
			catch (error) {
                console.error('Error creating new quiz', error);
            }
        }
    };

	const toggleSelectQuestion = (id, type) => {
        const updatedSelection = selectedQuestions.some((q) => q.ID === id)
        	? selectedQuestions.filter((q) => q.ID !== id)
        	: [...selectedQuestions, { ID: id, type }];
        setSelectedQuestions(updatedSelection);
        setDeleteButtonVisible(updatedSelection.length > 0);
	};

    const handleImageUpload = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const uploadedImage = result.assets[0].uri;
            var newName = await uploadFile(uploadedImage);
            setImage(`${config.IMAGE_URL}${newName}`);
            sendUpdateRequest({ quizName, image: newName });
        }
    };

    const handleDeleteSelectedQuestions = async () => {
        try {
			console.log(selectedQuestions);
            for (const { ID, type } of selectedQuestions) {
                await deleteQuestion(ID, type);
            }
            setQuestions((prevQuestions) =>
                prevQuestions.filter(
                    (q) => !selectedQuestions.some((sel) => sel.ID === q.ID),
                ),
            );
            setSelectedQuestions([]);
            setDeleteButtonVisible(false);
            await fetchQuestions(); // Refresh questions list
        }
		catch (error) {
            console.error('Error deleting selected questions:', error);
        }
    };

    const handleSaveQuiz = () => {
        sendUpdateRequest();
        navigation.navigate('UserQuizzesScreen');
    };

    const renderQuestionItem = ({ item }) => {
        const isSelected = selectedQuestions.some((q) => q.ID === item.ID);
        return (
            <View
                style={[
                    styles.questionItem,
                    isSelected && styles.selectedQuestionItem,
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.selectionCircle,
                        isSelected
                            ? styles.selectedCircle
                            : styles.unselectedCircle,
                    ]}
                    onPress={() => toggleSelectQuestion(item.ID, item.type)}
                />
                <Text style={styles.questionText}>{item.questionText}</Text>
                <View style={styles.questionActions}>
                    <TouchableOpacity onPress={() => handleEditQuestion(item)}>
                        <Icon name='create-outline' size={20} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteQuestion(item)}
                    >
                        <Icon name='trash-outline' size={20} color='red' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back-outline' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.title}>New Quiz</Text>
                <View style={styles.headerIconWrapper}>
                    {deleteButtonVisible && (
                        <TouchableOpacity
                            style={styles.deleteSelectedButton}
                            onPress={handleDeleteSelectedQuestions}
                        >
                            <Icon
                                name='trash-outline'
                                size={24}
                                color='white'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Text style={styles.label}>Quiz Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter quiz name'
                value={quizName}
                onChangeText={setQuizName}
            />

            {!quizId && (
                <>
                    <Text style={styles.label}>Add Grammar</Text>
                    <TouchableOpacity
                        style={styles.addQuestionButton}
                        onPress={handleAddGrammar}
                    >
                        <Icon name='add' size={40} color='white' />
                    </TouchableOpacity>
                </>
            )}

            {grammar && (
                <>
                    <Text style={styles.label}>Grammar</Text>
                    <View style={styles.questionItem}>
                        <Text style={styles.questionText}>{grammar}</Text>
                    </View>
                </>
            )}

            <Text style={styles.label}>Image</Text>
            {image ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.removeImage}
                        onPress={handleImageRemove}
                    >
                        <Icon name='close-circle' size={24} color='red' />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.imageUploadButton}
                    onPress={handleImageUpload}
                >
                    <Icon name='add' size={40} color='blue' />
                </TouchableOpacity>
            )}

            <Text style={styles.label}>Questions</Text>
            <FlatList
                data={questions}
                renderItem={renderQuestionItem}
                keyExtractor={(item) => item.ID.toString()}
                style={styles.questionList}
                ListFooterComponent={
                    <TouchableOpacity
                        style={styles.addQuestionButton}
                        onPress={handleAddQuestion}
                    >
                        <Icon name='add' size={40} color='white' />
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveQuiz}
            >
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default NewQuizScreen;