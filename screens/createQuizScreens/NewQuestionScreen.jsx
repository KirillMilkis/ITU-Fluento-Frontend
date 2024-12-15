/*
 * File: NewQuestionScreen.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './newQuizScreen.styles';
import { useNavigation } from '@react-navigation/native';

const NewQuestionScreen = ({ route }) => {
    const { quizId } = route.params;
    const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.topBarContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.spacing}>
                    <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Choose Question Type</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTrueFalseScreen', { quizId: quizId })}>
                <Text style={styles.text}>True / False</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateMultipleChoiceScreen', { quizId: quizId })}>
                <Text style={styles.text}>Multiple Choice</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateOrderingScreen', { quizId: quizId })}>
                <Text style={styles.text}>Word Ordering</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateMatchPairsScreen', { quizId: quizId })}>
                <Text style={styles.text}>Match Pairs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateFillInScreen', { quizId: quizId })}>
                <Text style={styles.text}>Image Recognition</Text>
            </TouchableOpacity>

        </ScrollView>
    </SafeAreaView>
    );
}

export default NewQuestionScreen;