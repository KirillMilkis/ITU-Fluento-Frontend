import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const getResults = async (navigation) => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/Alice/score`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Error getting results');
            throw new Error('Failed to get results');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getResults;