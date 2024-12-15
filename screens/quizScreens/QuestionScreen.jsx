/*
File: QuestionScreen.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.11.2024
Note: */
import React, { useRef, useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import getQuestion from '../../api/getQuestion';
import { evaluateAnswer, getResults } from '../../api';
import styles from './question.styles';
import MultipleChoice from '../../components/questions/MultipleChoice';
import TrueFalse from '../../components/questions/TrueFalse';
import FillInBlank from '../../components/questions/FillInBlank';
import MatchingQuestions from '../../components/questions/MatchingQuestions';
import OrderingQuestions from '../../components/questions/OrderingQuestions';

const QuestionScreen = ({navigation}) => {
    const route = useRoute();
    const {quizTitle} = route.params;
    const {quizID} = route.params;
    const [question, setQuestion] = useState([]);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [count, setCount] = useState(0);
    const questionComponentRef = useRef(null);

    // sending answer with bottom bar button
    const handleBottomBarSubmit = () => {
        const answer = questionComponentRef.current?.handleSubmit();
        evaluate(answer);
    };

    // new question reset
    const resetState = () => {
        setHasAnswered(false);
        setSelectedAnswer([]);
        setCorrectAnswer([]);
        questionComponentRef.current = null;
    };

    // check if question is last
    function isLast(fraction) {
        return /\b(\d+)\/\1\b/.test(fraction);
    }

    // get next question from api
    const fetchQuestion = async () => {
        if(isLast(question.counter)){
            navigation.navigate("ResultsScreen", {quizID});
        }
        else{
            try {
                const result = await getQuestion(quizID, count);
                setQuestion(result);
                resetState();
                console.log(result);
            } catch (error) {
                console.error("Failed to fetch question:", error);
            }
        }
    }
    useEffect(() => {
        fetchQuestion();
    }, []);

    // leave quiz with button in top bar
    const leaveQuiz = async () => {
        try {
            const result = await getResults(quizID, false);
        } catch (error) {
            console.error("Failed to quit quiz:", error);
        }
        navigation.popToTop()
    }

    // send answer to api and get result
    const evaluate = async (answer) => {
        console.log(answer)
        if (hasAnswered) return;
        setSelectedAnswer(answer); 
        try {
            setHasAnswered(true);
            const result = await evaluateAnswer(answer, quizID, count);
            setCount(count + 1);
            setCorrectAnswer(result);
            console.log(result);
        } catch (error) {
            setHasAnswered(false);
            console.error("Failed to evaluate answer:", error);
        }
    }

    // decide which type of question to render
    const renderQuestion = () => {
        switch (question.type) {
            case 'multipleChoice':
                return (
                    <MultipleChoice
                        question={question}
                        onSubmitAnswer={evaluate}
                        disabled={hasAnswered}
                        selectedAnswer={selectedAnswer}
                        correctAnswer={correctAnswer}
                    />
                );
            case 'trueFalse':
                return (
                    <TrueFalse
                        ref={questionComponentRef}
                        question={question}
                        disabled={hasAnswered}
                        correctAnswer={correctAnswer}
                    />
                );
            case 'fillInBlank':
                return (
                    <FillInBlank
                        ref={questionComponentRef}
                        question={question}
                        disabled={hasAnswered}
                        correctAnswer={correctAnswer}
                    />
                );
            case 'matchingQuestions':
                return (
                    <MatchingQuestions
                        ref={questionComponentRef}
                        question={question}
                        disabled={hasAnswered}
                        selectedAnswer={selectedAnswer}
                        correctAnswer={correctAnswer}
                    />
                );
            case 'orderingQuestions':
                return (
                    <OrderingQuestions
                        ref={questionComponentRef}
                        question={question}
                        disabled={hasAnswered}
                        correctAnswer={correctAnswer}
                    />
                );
            default:
                return <Text>Unsupported question type</Text>;
        }
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.topBarContainer]}>
                <Text style={[styles.topBarText]}>{quizTitle}</Text>
                <TouchableOpacity onPress={()=>leaveQuiz()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
            {renderQuestion()}
            <View style={[styles.bottomBarContainer]}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Ionicons name="school" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
                {!hasAnswered ? (
                    <TouchableOpacity onPress={handleBottomBarSubmit}>
                        <Ionicons name="checkmark" style={[styles.bottomBarIcon]} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => fetchQuestion()}>
                        <Ionicons name="arrow-forward" style={[styles.bottomBarIcon]} />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default QuestionScreen;