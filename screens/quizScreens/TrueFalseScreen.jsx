import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import styles from './question.styles';
import {Ionicons} from '@expo/vector-icons'
import config from '../../config/config';
import { evaluateAnswer, getQuestion } from '../../api';
import { useRoute } from '@react-navigation/native';

const TrueFalseScreen = ({navigation}) => {
    const route = useRoute();
    const {quizID} = route.params;
    const {question: qst, quizTitle} = route.params;
    const [outcome, setOutcome] = useState([]);
    const [question, setQuestion] = useState([]);

    const [answer1, setAnswer1] = useState(1);
    const [answer2, setAnswer2] = useState(1);
    const [answer3, setAnswer3] = useState(1);


    const toggleAnswer = (answer, setAnswer) => {
        if(answer == 0){
            setAnswer(1);
        }
        else{
            setAnswer(0);
        }
    };
    
    const formate = (msg) => {
        if(msg){
            msg = msg.replace(/0/g, "False").replace(/1/g, "True");
        }
        return msg;
    };

    const evaluate = async (answerA, answerB, answerC) => {
        try {
            const result = await evaluateAnswer(`${answerA},${answerB},${answerC}`);;
            setOutcome(result);
        } catch (error) {
            console.error("Failed to evaluate answer:", error);
        }
    }

    function isLast(fraction) {
        return /\b(\d+)\/\1\b/.test(fraction);
    }
    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchQuestion = async () => {
        if(isLast(qst.counter)){
            navigation.navigate("ResultsScreen", quizID);
        }
        else{
            try {
                const result = await getQuestion();;
                setQuestion(result);
            } catch (error) {
                console.error("Failed to fetch question:", error);
            }
        }
    }

    useEffect(() => {
        if (question && Object.keys(question).length > 0) {
            navigation.push(`${capitalizeFirstLetter(question.type)}Screen`, { question: question, quizTitle: quizTitle});
        }
    }, [question]);

    return (
    <SafeAreaView style={[styles.container]}>
            <View style={[styles.topBarContainer]}>
                <Text style={[styles.topBarText]}>{quizTitle}</Text>
                <TouchableOpacity onPress={()=>navigation.popToTop()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
            <Text style={[styles.question]}>{qst.description}</Text>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{qst.q1}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer1, setAnswer1)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer1 ? 'green' : 'red' }]}>{answer1 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{qst.q2}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer2, setAnswer2)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer2 ? 'green' : 'red' }]}>{answer2 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{qst.q3}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer3, setAnswer3)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer3 ? 'green' : 'red' }]}>{answer3 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.message]}>{formate(outcome.message)}</Text>
            <View style={[styles.bottomBarContainer]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>evaluate(answer1, answer2, answer3)}>
                    <Text style={[styles.complete]}>Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>fetchQuestion()}>
                    <Ionicons name="arrow-forward" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TrueFalseScreen;