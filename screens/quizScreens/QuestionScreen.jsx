import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import getQuestion from '../../api/getQuestion';
import { evaluateAnswer } from '../../api';
import styles from './question.styles';
import MultipleChoice from '../../components/questions/MultipleChoice';
import TrueFalse from '../../components/questions/TrueFalse';
import { useNavigation } from '@react-navigation/native';

const QuestionScreen = () => {
    const navigation = useNavigation();
    const [question, setQuestion] = useState([]);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);

    const resetState = () => {
        setHasAnswered(false);
        setSelectedAnswer([]);
        setCorrectAnswer([]);
    };

    function isLast(fraction) {
        return /\b(\d+)\/\1\b/.test(fraction);
    }

    const fetchQuestion = async () => {
        if(hasAnswered){
            if(isLast(question.counter)){
                navigation.navigate("ResultsScreen");
            }
        }
        try {
            const result = await getQuestion();;
            setQuestion(result);
            resetState();
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch question:", error);
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    const evaluate = async (answer) => {
        console.log(answer)
        if (hasAnswered) return;
        setSelectedAnswer(answer); 
        try {
            setHasAnswered(true);
            const result = await evaluateAnswer(answer);;
            setCorrectAnswer(result);
            console.log(result);
        } catch (error) {
            setHasAnswered(false);
            console.error("Failed to evaluate answer:", error);
        }
        
    }

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
                        question={question}
                        onSubmitAnswer={evaluate}
                        disabled={hasAnswered}
                        selectedAnswer={selectedAnswer}
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
                <TouchableOpacity onPress={()=>navigation.popToTop()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
            {renderQuestion()}
            <TouchableOpacity onPress={() => fetchQuestion()}>
                <Text>Next Question</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default QuestionScreen;