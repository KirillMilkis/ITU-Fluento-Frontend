/*
File: ResultsScreen.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.11.2024
Note: */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { getResults } from '../../api';
import styles from './results.styles';
import {Ionicons} from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';

const ResultsScreen = ({navigation}) => {
    const [results, setResults] = useState([]);
    const route = useRoute();
    const {quizID} = route.params;
    
    // get results from api
    const fetchResults = async () => {
        try {
            const result = await getResults(quizID, true);
            setResults(result);
        } catch (error) {
            console.error("Failed to get results:", error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.topBarContainer]}>
                <Text style={[styles.topBarText]}>Quiz Results</Text>
                <TouchableOpacity onPress={()=>navigation.popToTop()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
            <Text style={[styles.mainScore, {color:results.correctColor}]}>{Math.floor(parseFloat(results.correct))}%</Text>
            <Text style={[styles.message]}>Correct Answers</Text>
            <Text style={[styles.secText]}>Vocabulary Mistakes</Text>
            <Text style={[styles.secScore , {color:results.vocabularyColor}]}>{Math.floor(parseFloat(results.vocabularyMistakes))}%</Text>
            <Text style={[styles.secText]}>Grammar Mistakes</Text>
            <Text style={[styles.secScore , {color:results.grammarColor}]}>{Math.floor(parseFloat(results.grammarMistakes))}%</Text>
            <Text style={[styles.message]}>{results.description}</Text>
            <TouchableOpacity style={[styles.bottomBarContainer]} onPress={()=>navigation.popToTop()}>
                <Text style={[styles.bottomBarText]}>Finish Quiz</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ResultsScreen;
