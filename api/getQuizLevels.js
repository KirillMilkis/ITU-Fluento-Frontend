import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const getQuizLevels = async () => {

    try {
        const responce = await fetch(`${config.API_URL}quizzes/listLanguageLevels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!responce.ok) {
            console.log('Error reading quiz levels');
            throw new Error('Failed to fetch quiz levels');
        }

        const data = await responce.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default getQuizLevels;