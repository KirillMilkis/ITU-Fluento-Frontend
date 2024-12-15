import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from '../../constants/theme';

const OrderingQuestions = forwardRef(({ question, disabled, selectedAnswer, correctAnswer }, ref) => {
    // Bezpečné zpracování správného pořadí
    const correctOrder = correctAnswer?.message
        ? correctAnswer.message.includes("is")
            ? correctAnswer.message.split("is")[1]?.trim()?.split(",") || []
            : [] // Pokud chybí "is", vrátíme prázdné pole
        : [];

    const [data, setData] = useState(
        question?.options
            ?.split(", ")
            ?.map((item, index) => ({ key: `${index}`, label: item })) || [] // Výchozí prázdné pole
    );

    const handleDragEnd = ({ data: newData }) => {
        if (!disabled) {
            setData(newData);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    const handleSubmit = () => {
        if (disabled) return;
        const formattedAnswer = data.map((item) => item.label).join(",");
        return formattedAnswer;
    };

    function formateAnswer(msg) {
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

    const getItemStyle = (label) => {
        const currentIndex = data.findIndex((item) => item.label === label);
        if (disabled) {
            if(correctAnswer.isCorrect){
                return styles.correctItem;
            }
            if (correctOrder[currentIndex] === label) {
                return styles.correctItem; // Zelená - správná pozice
            } else {
                return styles.wrongItem; // Červená - špatná pozice
            }
        }
        return styles.item; // Bez obarvení
    };

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
                        onPressIn={!disabled ? drag : undefined} // Zakázání přetažení při disabled
                    >
                        <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={[styles.message, getMessageStyle()]}>{formateAnswer(correctAnswer?.message)}</Text>
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
        backgroundColor: "#f8f9fa", // Defaultní barva
    },
    correctItem: {
        backgroundColor: "#d4edda", // Světle zelená
    },
    wrongItem: {
        backgroundColor: "#f8d7da", // Světle červená
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
        color: "#28a745", // Zelená barva pro správnou odpověď
    },
    wrongMessage: {
        color: "#dc3545", // Červená barva pro špatnou odpověď
    },
});

export default OrderingQuestions;

