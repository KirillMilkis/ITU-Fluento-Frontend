/*
File: MultipleChoice.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.12.2024
Note: */
import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import config from '../../config/config';

const MultipleChoice = ({ question, onSubmitAnswer, disabled, selectedAnswer, correctAnswer }) => {

    // parse correct answer
    function extractCorrectAnswer(input) {
        if (input) {
            const parts = input.split("is");
            if (parts.length > 1) {
                return parts[1].trim();
            }
        }
        return "";
    }

    // manage button color
    const getButtonStyle = (optionValue) => {
        if (!correctAnswer.message) return styles.option; // normal

        if (optionValue === selectedAnswer && correctAnswer.isCorrect) {
            return [styles.option, styles.correct]; // green
        }

        if (optionValue === selectedAnswer && !correctAnswer.isCorrect) {
            return [styles.option, styles.wrong]; // red
        }

        if (!correctAnswer.isCorrect && optionValue === extractCorrectAnswer(correctAnswer.message)) {
            return [styles.option, styles.correct]; // green
        }

        return [styles.option, styles.optionDisabled]; //gray
    };
    

    return (
        <SafeAreaView>
            <Text style={[styles.question]}>{question.question}</Text>
            <Image
                source={{ uri: `${config.IMAGE_URL}${question.imagePath}` }}
                style={styles.image}
            />
            <View style={[styles.optionsContainer1]}>
                <View style={[styles.optionsContainer]}>

                    <TouchableOpacity
                        onPress={() => onSubmitAnswer(question.optionA)}
                        disabled={disabled}
                        style={getButtonStyle(question.optionA)}
                    >
                        <Text style={styles.optionText}>{question.optionA}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onSubmitAnswer(question.optionB)}
                        disabled={disabled}
                        style={getButtonStyle(question.optionB)}
                    >
                        <Text style={styles.optionText}>{question.optionB}</Text>
                    </TouchableOpacity>

                </View>

                <View style={[styles.optionsContainer]}>

                    <TouchableOpacity
                        onPress={() => onSubmitAnswer(question.optionC)}
                        disabled={disabled}
                        style={getButtonStyle(question.optionC)}
                    >
                        <Text style={styles.optionText}>{question.optionC}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onSubmitAnswer(question.optionD)}
                        disabled={disabled}
                        style={getButtonStyle(question.optionD)}
                    >
                        <Text style={styles.optionText}>{question.optionD}</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {correctAnswer.message && (
                <Text style={[
                    styles.message,
                    correctAnswer.isCorrect
                        ? { color: 'green' }
                        : { color: 'red'}
                ]}>{correctAnswer.message}</Text>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    question: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: "bold",
    },
    message: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        textAlign: "center",
        fontSize: 22,
    },
    optionsContainer1: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    optionsContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "50%",
    },
    option: {
        width: "95%",
        height: 80,
        backgroundColor: "gray",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5,
    },
    optionText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
    optionDisabled: {
        backgroundColor: "#d3d3d3",
    },
    correct: {
        backgroundColor: "#4caf50", // green
    },
    wrong: {
        backgroundColor: "#f44336", // red
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
        alignSelf: "center",
    },
});

export default MultipleChoice;
