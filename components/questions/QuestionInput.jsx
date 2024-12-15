/*
 * File: QuestionInput.jsx
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note:
 */
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './question.styles';

const QuestionInput = ({
    index,
    value,
    onChangeText,
    labelText = `Type question n. ${index + 1}`,
    placeholderText = `Enter question n. ${index + 1}`,
}) => {
    return (
        <View>
            {/* Customizable Label */}
            <Text style={styles.text}>{labelText}</Text>
            
			{/* Text Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholderText}
                    value={value}
                    onChangeText={(text) => onChangeText(index, text)}
                    multiline={true}
                    maxLength={250}
                    textAlignVertical='top'
                />
                {/* Render lines */}
                <View style={[styles.line, { top: 30 }]} />
                <View style={[styles.line, { top: 50 }]} />
                <View style={[styles.line, { top: 70 }]} />
            </View>
        </View>
    );
};

export default QuestionInput;
