import React from 'react';
import config from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme'

const MultipleChoice = ({ question, onSubmitAnswer, disabled, selectedAnswer, correctAnswer }) => {
    const getButtonStyle = (optionValue) => {
        if (!disabled) return styles.option; // Původní styl pro nevybranou možnost

        // Změna barvy po odeslání odpovědi
        if (optionValue === correctAnswer) {
            return [styles.option, styles.correct]; // Správná odpověď zeleně
        }
        if (optionValue === selectedAnswer && optionValue !== correctAnswer) {
            return [styles.option, styles.wrong]; // Špatná odpověď červeně
        }
        return styles.optionDisabled; // Ostatní odpovědi šedé
    };

    console.log("Correct Answer:", correctAnswer.message);

    return (
        <SafeAreaView>
            <Text style={[styles.question]}>{question.question}</Text>
            <Image
                        source={{
                            uri: `${config.IMAGE_URL}${question.imagePath}`,
                        }}
                        style={styles.image}
                        />

            <View style={[styles.optionsContainer1]}>
                <View style={[styles.optionsContainer]}>
                    <TouchableOpacity onPress={() => onSubmitAnswer(question.optionA)} disabled={disabled}>
                        <Text style={[styles.option]}>{question.optionA}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSubmitAnswer(question.optionB)} disabled={disabled}>
                        <Text style={[styles.option]}>{question.optionB}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.optionsContainer]}>
                    <TouchableOpacity onPress={() => onSubmitAnswer(question.optionC)} disabled={disabled}>
                        <Text style={[styles.option]}>{question.optionC}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSubmitAnswer(question.optionD)} disabled={disabled}>
                        <Text style={[styles.option]}>{question.optionD}</Text>
                    </TouchableOpacity>
                </View >
            </View>
            <Text style={[styles.message]}>{correctAnswer.message}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    question:{
        paddingVertical: 45,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },

    message: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        textAlign: "center",
        fontSize: SIZES.h1-2,
    },

    optionsContainer1: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    optionsContainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
        width: "50%",
    },

    option: {
        width: '95%',
        height: 80,
        backgroundColor: 'gray',
        borderRadius: 12,
        textAlign: "center",
        verticalAlign: "middle",
        padding: 10,
        fontSize: SIZES.h2,
        alignSelf: "center",
        margin: 5,
    },
    optionDisabled: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    correct: {
        backgroundColor: '#4caf50', // Zelená pro správnou odpověď
    },
    wrong: {
        backgroundColor: '#f44336', // Červená pro špatnou odpověď
    },

    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
        alignSelf: "center",
    },

});

export default MultipleChoice;