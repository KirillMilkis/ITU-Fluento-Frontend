/*
File: TrueFalse.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.12.2024
Note: */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const TrueFalse = forwardRef(({ question, disabled, correctAnswer }, ref) => {
    const [answer1, setAnswer1] = useState(1);
    const [answer2, setAnswer2] = useState(1);
    const [answer3, setAnswer3] = useState(1);

    // ref function
    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    // send answer to questionScreen
    const handleSubmit = () => {
        if (disabled) return null; 
        return `${answer1},${answer2},${answer3}`;
    };

    // true <-> false switch
    const toggleAnswer = (answer, setAnswer) => {
        if (answer == 0) {
            setAnswer(1);
        } else {
            setAnswer(0);
        }
    };

    //parse correct answers
    const parseCorrectAnswers = correctAnswer => {
        if (correctAnswer && correctAnswer.message) {
            const correctAnswers = correctAnswer.message.match(/\d+/g);
            return correctAnswers ? correctAnswers.map(Number) : [];
        }
        return [];
    };

    // set correct answers
    const correctAnswers = parseCorrectAnswers(correctAnswer);

    // format answer for print
    const getAnswerStatus = (answer, corrAnswer) => {
        if(correctAnswer.isCorrect){
            return { text: 'Correct', color: 'green' };
        }
        if (answer === corrAnswer) {
            return { text: 'Correct', color: 'green' };
        }
        return { text: 'Wrong', color: 'red' };
    };

    return (
        <SafeAreaView>
            <Text style={[styles.question]}>{question.description}</Text>

            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q1}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer1, setAnswer1)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer1 ? 'green' : 'red' }]}>
                        {answer1 ? 'True' : 'False'}
                    </Text>
                </TouchableOpacity>
            </View>
            {correctAnswer.message && (
                <Text style={[styles.answerStatus, { color: getAnswerStatus(answer1, correctAnswers[0]).color}]}>
                    {getAnswerStatus(answer1, correctAnswers[0]).text}
                </Text>
            )}

            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q2}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer2, setAnswer2)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer2 ? 'green' : 'red' }]}>
                        {answer2 ? 'True' : 'False'}
                    </Text>
                </TouchableOpacity>
            </View>
            {correctAnswer.message && (
                <Text style={[styles.answerStatus, { color: getAnswerStatus(answer2, correctAnswers[1]).color}]}>
                    {getAnswerStatus(answer2, correctAnswers[1]).text}
                </Text>
            )}

            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q3}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer3, setAnswer3)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer3 ? 'green' : 'red' }]}>
                        {answer3 ? 'True' : 'False'}
                    </Text>
                </TouchableOpacity>
            </View>
            {correctAnswer.message && (
                <Text style={[styles.answerStatus, { color: getAnswerStatus(answer3, correctAnswers[2]).color}]}>
                    {getAnswerStatus(answer3, correctAnswers[2]).text}
                </Text>
            )}

        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    question: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: "bold",
    },
    trueFalseContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    trueFalseText: {
        fontSize: SIZES.font + 2,
        paddingVertical: 10,
        width: "70%"
    },
    trueFalseButton: {
        borderRadius: 12,
        marginVertical: 15,
        paddingVertical: 10,
        width: 93,
        textAlign: "center",
        fontSize: SIZES.h2 - 2,
    },
    answerStatus: {
        fontSize: SIZES.h2,
        paddingHorizontal: 20,
        marginBottom: 30,
        paddingBottom: 15,
        textAlign: "center",
        borderBottomWidth: 1,
    },
});

export default TrueFalse;
