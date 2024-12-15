/*
File: MatchingQuestions.jsx
Author: Petra Oravová <xoravo01>
Date Created: 12.12.2024
Note: */
import React, {  forwardRef, useImperativeHandle, useState, useRef} from 'react';
import config from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme'
import Svg, { Line } from "react-native-svg";

const MatchingQuestions = forwardRef(({ question, disabled, correctAnswer }, ref) => {
    const { leftItems, rightItems } = question;
    const leftList = leftItems.split(", ");
    const rightList = rightItems.split(", ");
    const [feedback, setFeedback] = useState({ correct: [], wrong: [], missing: [] }); // Správné/špatné odpovědi
    const [connections, setConnections] = useState([]); // Pole spojení
    const [selected, setSelected] = useState(null); // Vybraný item
    const [positions, setPositions] = useState({ left: {}, right: {} });
    const refs = {
        left: useRef({}),
        right: useRef({}),
    };

    // helps locate lines
    const measureItem = (ref, side, item) => {
        if (ref) {
            ref.measureInWindow((x, y, width, height) => {
                setPositions((prev) => ({
                    ...prev,
                    [side]: { ...prev[side], [item]: { x, y, width, height } },
                }));
            });
        }
    };

    const handleSelect = (side, item) => {
        if (disabled) return;

        if (selected) {
            if (selected.side !== side) {
                // add connection
                setConnections((prevConnections) => {
                    const updatedConnections = prevConnections.filter(
                        (conn) => conn.left !== selected.item && conn.right !== item && conn.left !== item && conn.right != selected.item
                    );
                    updatedConnections.push(
                        side === "left"
                            ? { left: item, right: selected.item }
                            : { left: selected.item, right: item }
                    );
                    return updatedConnections;
                });
                setSelected(null); // cancel
            } else {
                setSelected({ side, item }); 
            }
        } else {
            setSelected({ side, item });
        }
    };

    // format connections
    const formatAnswer = () => {
        return connections.map(({ left, right }) => `${left}=${right}`).join(",");
    };

    // ref function
    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    // send answer to questionScreen
    const handleSubmit = () => {
        if (disabled) return;
        const answer = formatAnswer();
        return answer;
    };

    // show what was wrong and what was correct
    const handleFeedback = (message) => {
        if (message === "Correct") {
            setFeedback({ correct: connections, wrong: [], missing: [] });
        } else {
            const correctAnswers = message
                .replace("Wrong, the correct answer is ", "")
                .split(",");
            const correctPairs = correctAnswers.map((pair) => {
                const [left, right] = pair.split("=");
                return { left, right };
            });

            const wrongConnections = connections.filter(
                (conn) =>
                    !correctPairs.some(
                        (correct) => correct.left === conn.left && correct.right === conn.right
                    )
            );

            const missingConnections = correctPairs.filter(
                (correct) =>
                    !connections.some(
                        (conn) => conn.left === correct.left && conn.right === correct.right
                    )
            );

            setFeedback({ correct: connections.filter(
                (conn) =>
                    correctPairs.some(
                        (correct) => correct.left === conn.left && correct.right === conn.right
                    )
            ), wrong: wrongConnections, missing: missingConnections });
        }
    };

    // after submit, call handleFeedback
    React.useEffect(() => {
        if (correctAnswer?.message) {
            handleFeedback(correctAnswer.message);
        }
    }, [correctAnswer]);


    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question.questionsText}</Text>
            <View style={styles.listsContainer}>
                {/* left list */}
                <View style={styles.column}>
                    {leftList.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.item,
                                selected?.side === "left" && selected.item === item && styles.selectedItem,
                            ]}
                            onPress={() => handleSelect("left", item)}
                            ref={(el) => (refs.left.current[item] = el)}
                            onLayout={() => measureItem(refs.left.current[item], "left", item)}
                        >
                            <Text style={styles.text}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* SVG for lines */}
                <Svg style={styles.svgContainer}>
                    {/* Lines for connections */}
                    {connections.map(({ left, right }, index) => {
                        const leftPos = positions.left[left];
                        const rightPos = positions.right[right];

                        if (!leftPos || !rightPos) return null;

                        const isCorrect = feedback.correct.some(
                            (correct) => correct.left === left && correct.right === right
                        );
                        const isWrong = feedback.wrong.some(
                            (wrong) => wrong.left === left && wrong.right === right
                        );

                        return (
                            <Line
                                key={index}
                                x1={leftPos.x + leftPos.width / 2 + 40}
                                y1={leftPos.y + leftPos.height / 2 - 220}
                                x2={rightPos.x + rightPos.width / 2 - 70}
                                y2={rightPos.y + rightPos.height / 2 - 220}
                                stroke={isCorrect ? "green" : isWrong ? "red" : "blue"}
                                strokeWidth="2"
                            />
                        );
                    })}

                    {/* Green lines for missing correct connections */}
                    {feedback.missing.map(({ left, right }, index) => {
                        const leftPos = positions.left[left];
                        const rightPos = positions.right[right];

                        if (!leftPos || !rightPos) return null;

                        return (
                            <Line
                                key={`missing-${index}`}
                                x1={leftPos.x + leftPos.width / 2 + 40}
                                y1={leftPos.y + leftPos.height / 2 - 220}
                                x2={rightPos.x + rightPos.width / 2 - 70}
                                y2={rightPos.y + rightPos.height / 2 - 220}
                                stroke="green"
                                strokeWidth="5"
                            />
                        );
                    })}
                </Svg>

                {/* right list */}
                <View style={styles.column}>
                    {rightList.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.item,
                                selected?.side === "right" && selected.item === item && styles.selectedItem,
                            ]}
                            onPress={() => handleSelect("right", item)}
                            ref={(el) => (refs.right.current[item] = el)}
                            onLayout={() => measureItem(refs.right.current[item], "right", item)}
                        >
                            <Image
                                source={{ uri: `${config.IMAGE_URL}${item}` }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {correctAnswer.message && (
                <Text style={{ paddingTop:20, fontSize:SIZES.h2, color: correctAnswer.isCorrect ? 'green' : 'red' }}>
                    {correctAnswer.isCorrect ? 'Correct' : 'Wrong, green lines are correct, red lines are your wrong answers'}
                </Text>
            )}
        </View>
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
    text:{
        textAlign:"center",
        padding:15,
        fontSize:SIZES.h3,
    },
    message: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        textAlign: "center",
        fontSize: 18,
    },
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 80,
    },
    listsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        flex: 1,
    },
    column: {
        flex: 1,
        marginHorizontal: 20,
        alignItems:"center"
    },
    item: {
        backgroundColor:COLORS.gray1,
        width:120,
        height:80,
        paddingVertical: 12,
        marginVertical: 5,
        borderRadius: 4,
        alignItems: "center",
    },
    selectedItem: {
        backgroundColor: "#cce5ff",
    },
    svgContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
    },
    image: {
        width: 60,
        height: 60,
        alignSelf: "center",
        backgroundColor: COLORS.gray1,
    },
});


export default MatchingQuestions;