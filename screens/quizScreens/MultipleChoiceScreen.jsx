import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './question.styles';
import {Ionicons} from '@expo/vector-icons'
import config from '../../config/config';
import { evaluateAnswer, getQuestion } from '../../api';

const MultipleChoiceScreen = ({navigation}) => {
    const route = useRoute();
    const {question: qst, quizTitle} = route.params;
    const [outcome, setOutcome] = useState([]);
    const [question, setQuestion] = useState([]);

    const evaluate = async (answer) => {
        try {
            const result = await evaluateAnswer(answer);;
            setOutcome(result);
        } catch (error) {
            console.error("Failed to evaluate answer:", error);
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function isLast(fraction) {
        return /\b(\d+)\/\1\b/.test(fraction);
    }

    const fetchQuestion = async () => {
        if(isLast(qst.counter)){
            navigation.navigate("ResultsScreen");
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
            <Text style={[styles.question]}>{qst.question}</Text>
            <Image
                        source={{
                            uri: `${config.IMAGE_URL}${qst.imagePath}`,
                        }}
                        style={styles.image}
                        />

            <View style={[styles.optionsContainer1]}>
                <View style={[styles.optionsContainer]}>
                    <TouchableOpacity onPress={()=>evaluate(qst.optionA)}>
                        <Text style={[styles.option]}>{qst.optionA}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>evaluate(qst.optionB)}>
                        <Text style={[styles.option]}>{qst.optionB}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.optionsContainer]}>
                    <TouchableOpacity onPress={()=>evaluate(qst.optionC)}>
                        <Text style={[styles.option]}>{qst.optionC}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>evaluate(qst.optionD)}>
                        <Text style={[styles.option]}>{qst.optionD}</Text>
                    </TouchableOpacity>
                </View >
            </View>
            <Text style={[styles.message]}>{outcome.message}</Text>
            <View style={[styles.bottomBarContainer]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>fetchQuestion()}>
                    <Ionicons name="arrow-forward" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MultipleChoiceScreen;