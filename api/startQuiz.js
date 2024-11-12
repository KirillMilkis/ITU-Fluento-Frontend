import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const startQuiz = async (quizID) => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/Alice/start/${quizID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Error fetching grammar');
            throw new Error('Failed to fetch grammar');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default startQuiz;