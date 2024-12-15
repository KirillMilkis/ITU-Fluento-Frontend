/**
 * File: FlashCardForm.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 9.12.2024
 * 
 */
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, {useCallback, useEffect} from 'react'
import styles from './flashCardForm.styles';
import { useForm } from 'react-hook-form';

const FlashCardForm = ({exists = false, flashCardItem = null, submitFunc}) => {
    
    const { handleSubmit, register, setValue, error } = useForm();
    /**
     * @brief Function to handle form input changes
     * 
     * @param {Object} formData
     */
    const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    });
    
    // Set the values to the form inputs if the flash card exists and we edit it
    useEffect(() => {
        if (exists) {
            console.log(flashCardItem);
            setValue('question', flashCardItem.question);
            setValue('answer', flashCardItem.answer);
        }
    }, [exists, flashCardItem]);

    return (
        <View style={[styles.formContainer, styles.spacing]}>
            <View style={styles.flashCardContainer}>
                <View style={styles.flashCardTop}>
                    <Text style={[styles.textStyle, styles.titleSpacing]}>Question</Text>
                    <TextInput 
                        placeholder='Enter question' 
                        style={styles.inputStyle}
                        onChangeText={onChangeField('question')}
                        defaultValue={flashCardItem ? flashCardItem.question : ''}
                    />
                </View>
                <View style={styles.flashCardBottom}>
                    <Text style={[styles.textStyle, styles.titleSpacing]}>Answer</Text>
                    <TextInput 
                        placeholder='Enter answer' 
                        style={styles.inputStyle}
                        onChangeText={onChangeField('answer')}
                        defaultValue={flashCardItem ? flashCardItem.answer : ''}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.submitButton, styles.spacing2]} onPress={handleSubmit(submitFunc)}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
} 

export default FlashCardForm