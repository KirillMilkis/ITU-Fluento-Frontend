import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const evaluateAnswer = async (myAnswer) => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/Alice/evaluate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: myAnswer
            }),
        });

        if (!response.ok) {
            console.log('Error evaluate answer');
            throw new Error('Failed to evaluate answer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default evaluateAnswer;