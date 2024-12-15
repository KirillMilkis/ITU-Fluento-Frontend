/*
File: FillInBlank.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.12.2024
Note: */
import React, {  forwardRef, useImperativeHandle, useState } from 'react';
import config from '../../config/config';
import { View, Text, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme'

const FillInBlank = forwardRef(({ question, disabled, correctAnswer }, ref) => {
    const [answers, setAnswers] = useState({ a1: "", a2: "", a3: "", a4: "" });

    // ref function
    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    // handle change of answer
    const handleChange = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    // send answer to questionScreen
    const handleSubmit = () => {
        if (disabled) return null;
        return `${answers.a1},${answers.a2},${answers.a3},${answers.a4}`;
    };

    // change color depending on correctness
    const getInputStyle = (key, correctAnswers) => {
        if (!correctAnswers || correctAnswers.length === 0) return styles.input;
        if(correctAnswer.isCorrect) return [styles.input, styles.correctInput];
    
        const index = Object.keys(answers).indexOf(key);
        if (index === -1 || index >= correctAnswers.length) return styles.input;
    
        const isCorrect = answers[key] === correctAnswers[index];
        return isCorrect ? [styles.input, styles.correctInput] : [styles.input, styles.incorrectInput];
    };

    // parse correct answers
    const correctAnswers = correctAnswer?.message
    ? correctAnswer.message.split(" ").slice(-1)[0].split(",")
    : [];


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.description}>{question.description}</Text>
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Image source={{ uri: `${config.IMAGE_URL}${question.i1}` }} style={styles.image} />
                    <TextInput
                        style={getInputStyle("a1", correctAnswers)}
                        placeholder="Enter your answer"
                        value={answers.a1}
                        onChangeText={(text) => handleChange("a1", text)}
                        editable={!disabled}
                    />
                    {!correctAnswer.isCorrect && correctAnswers.length > 0 && answers.a1 !== correctAnswers[0] && (
                        <Text style={styles.correctAnswer}>
                            Correct: {correctAnswers[0]}
                        </Text>
                    )}
                </View>

                <View style={styles.columnContainer}>
                    <Image source={{ uri: `${config.IMAGE_URL}${question.i2}` }} style={styles.image} />
                    <TextInput
                        style={getInputStyle("a2", correctAnswers)}
                        placeholder="Enter your answer"
                        value={answers.a2}
                        onChangeText={(text) => handleChange("a2", text)}
                        editable={!disabled}
                    />
                    {!correctAnswer.isCorrect && correctAnswers.length > 0 && answers.a2 !== correctAnswers[1] && (
                        <Text style={styles.correctAnswer}>
                            Correct: {correctAnswers[1]}
                        </Text>
                    )}
                </View>
            </View>


            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Image source={{ uri: `${config.IMAGE_URL}${question.i3}` }} style={styles.image} />
                    <TextInput
                        style={getInputStyle("a3", correctAnswers)}
                        placeholder="Enter your answer"
                        value={answers.a3}
                        onChangeText={(text) => handleChange("a3", text)}
                        editable={!disabled}
                    />
                    {!correctAnswer.isCorrect && correctAnswers.length > 0 && answers.a3 !== correctAnswers[2] && (
                        <Text style={styles.correctAnswer}>
                            Correct: {correctAnswers[2]}
                        </Text>
                    )}
                </View>

                <View style={styles.columnContainer}>
                    <Image source={{ uri: `${config.IMAGE_URL}${question.i4}` }} style={styles.image} />
                    <TextInput
                        style={getInputStyle("a4", correctAnswers)}
                        placeholder="Enter your answer"
                        value={answers.a4}
                        onChangeText={(text) => handleChange("a4", text)}
                        editable={!disabled}
                    />
                    {!correctAnswer.isCorrect && correctAnswers.length > 0 && answers.a4 !== correctAnswers[3] && (
                        <Text style={styles.correctAnswer}>
                            Correct: {correctAnswers[3]}
                        </Text>
                    )}
                </View>
            </View>

            {correctAnswer.message && (
                <Text style={{ paddingTop:20, fontSize:SIZES.h2+6, color: correctAnswer.isCorrect ? 'green' : 'red' }}>
                    {correctAnswer.isCorrect ? 'Correct' : 'Wrong'}
                </Text>
            )}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
        paddingBottom:100,
    },
    description: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: "bold",
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    columnContainer: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        textAlign: "center",
    },
    correctInput: {
        borderColor: "green",
        backgroundColor: "#e6ffe6",
    },
    incorrectInput: {
        borderColor: "red",
        backgroundColor: "#ffe6e6",
    },
    correctText: {
        color: "green",
        fontWeight: "bold",
    },
    incorrectText: {
        color: "red",
        fontWeight: "bold",
    },
});

export default FillInBlank;