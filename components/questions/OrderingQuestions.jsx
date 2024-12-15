/*
File: OrderingQuestions.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.12.2024
Note: */
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from '../../constants/theme';

const OrderingQuestions = forwardRef(({ question, disabled, correctAnswer }, ref) => {
    // set correct order
    const correctOrder = correctAnswer?.message
        ? correctAnswer.message.includes("is")
            ? correctAnswer.message.split("is")[1]?.trim()?.split(",") || []
            : []
        : [];

    // set data
    const [data, setData] = useState(
        question?.options
            ?.split(", ")
            ?.map((item, index) => ({ key: `${index}`, label: item })) || []
    );

    // handle drag
    const handleDragEnd = ({ data: newData }) => {
        if (!disabled) {
            setData(newData);
        }
    };

    // ref function
    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    // send answer to questionScreen
    const handleSubmit = () => {
        if (disabled) return;
        const formattedAnswer = data.map((item) => item.label).join(",");
        return formattedAnswer;
    };

    // format answer for print
    function formatAnswer(msg) {
        if (msg && !correctAnswer.isCorrect) {
            const parts = msg.split("is");
            const firstPart = parts[0]?.trim();
            const secPart = parts[1]?.trim()?.split(",");
            const formattedSecPart = secPart?.join(" -> ");
            return `${firstPart} is ${formattedSecPart}`;
        } else {
            return msg || "";
        }
    }

    // manage item color
    const getItemStyle = (label) => {
        const currentIndex = data.findIndex((item) => item.label === label);
        if (disabled) {
            if(correctAnswer.isCorrect){
                return styles.correctItem;
            }
            if (correctOrder[currentIndex] === label) {
                return styles.correctItem; // green
            } else {
                return styles.wrongItem; // red
            }
        }
        return styles.item; normal
    };

    // decide result color
    const getMessageStyle = () => {
        return correctAnswer?.isCorrect ? styles.correctMessage : styles.wrongMessage;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question?.questionsText || "Question text missing"}</Text>
            <DraggableFlatList
                data={data}
                onDragEnd={handleDragEnd}
                keyExtractor={(item) => item.key}
                activationDistance={5}
                renderItem={({ item, drag }) => (
                    <TouchableOpacity
                        style={[styles.item, getItemStyle(item.label)]}
                        onPressIn={!disabled ? drag : undefined} // no drag when disabled
                    >
                        <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={[styles.message, getMessageStyle()]}>{formatAnswer(correctAnswer?.message)}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    question: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: SIZES.h1,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    correctItem: {
        backgroundColor: "#d4edda",
    },
    wrongItem: {
        backgroundColor: "#f8d7da",
    },
    itemText: {
        fontSize: 16,
    },
    message: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        textAlign: "center",
        fontSize: 18,
    },
    correctMessage: {
        color: "#28a745", // green
    },
    wrongMessage: {
        color: "#dc3545", // red
    },
});

export default OrderingQuestions;

