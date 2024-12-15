import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const getQuizzesByLevel = async (level) => {

    try {
        const responce = await fetch(`${config.API_URL}quizzes/${level}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!responce.ok) {
            throw new Error('Failed to fetch quizzes');
        }

        const data = await responce.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default getQuizzesByLevel;