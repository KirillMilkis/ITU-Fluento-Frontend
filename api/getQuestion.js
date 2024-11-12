import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const getQuestion = async () => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/Alice/fetchQuestion`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Error fetching question');
            throw new Error('Failed to fetch question');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getQuestion;