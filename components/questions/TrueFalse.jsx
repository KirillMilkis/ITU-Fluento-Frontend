import React, { useState } from 'react';
import config from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme'

const TrueFalse = ({ question, onSubmitAnswer, disabled, selectedAnswer, correctAnswer }) => {
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


    return (
        <SafeAreaView>
            <Text style={[styles.question]}>{question.description}</Text>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q1}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer1, setAnswer1)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer1 ? 'green' : 'red' }]}>{answer1 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q2}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer2, setAnswer2)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer2 ? 'green' : 'red' }]}>{answer2 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.trueFalseContainer]}>
                <Text style={[styles.trueFalseText]}>{question.q3}</Text>
                <TouchableOpacity onPress={() => toggleAnswer(answer3, setAnswer3)}>
                    <Text style={[styles.trueFalseButton, { backgroundColor: answer3 ? 'green' : 'red' }]}>{answer3 ? 'True' : 'False'}</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.message]}>{formate(correctAnswer.message)}</Text>
            <TouchableOpacity onPress={()=>onSubmitAnswer(`${answer1},${answer2},${answer3}`)}>
                    <Text style={[styles.complete]}>Complete</Text>
            </TouchableOpacity>
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

    trueFalseContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    trueFalseText: {
        fontSize: SIZES.font+2,
        paddingVertical: 10,
        width: "70%"
    },

    trueFalseButton: {
        borderRadius: 12,
        marginVertical: 15,
        paddingVertical: 10,
        width: 93,
        textAlign: "center",
        fontSize: SIZES.h2-2,
    },

    complete:{
        borderRadius: 12,
        width: 130,
        padding: 8,
        textAlign: "center",
        fontSize: SIZES.h2,
        backgroundColor: COLORS.green,
        color: COLORS.white,
    },

    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
        alignSelf: "center",
    },

});

export default TrueFalse;