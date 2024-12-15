/*
 * File: CreateGrammarScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addGrammar, getGrammars } from '../../api';
import styles from './newQuizScreen.styles';
import { useFocusEffect } from '@react-navigation/native';

const CreateGrammarScreen = ({ route, navigation }) => {
    const [grammars, setGrammars] = useState([]);
    const [quizId, setQuizId] = useState(route?.params?.quizId || null);

    useFocusEffect(
        useCallback(() => {
            if (quizId) {
                fetchGrammars();
            }
        }, [quizId]),
    );

    const fetchGrammars = async () => {
        try {
            let data = await getGrammars();
            setGrammars(data);
        }
		catch (error) {
            console.error('Error fetching grammars', error);
        }
    };

    const handleAddGrammar = async (grammarID, name) => {
        await addGrammar(quizId, grammarID);
        navigation.navigate('NewQuizScreen', { quizId: quizId, grammar: name });
    };

    const renderGrammarItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.questionItem}
                onPress={() => handleAddGrammar(item.ID, item.name)}
            >
                <Text style={styles.questionText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Grammars</Text>
            <FlatList
                data={grammars}
                renderItem={renderGrammarItem}
                keyExtractor={(item) => item.ID.toString()}
                style={styles.questionList}
            />
        </SafeAreaView>
    );
};

export default CreateGrammarScreen;