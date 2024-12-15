/*
File: getQuestion.js
Author: Petra Oravová <xoravo01>
Date Created: 12.11.2024
Note: */
import config from '../config/config';

const getQuestion = async (quizID, count) => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/Alice/fetchQuestion/${quizID}/${count}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch question, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getQuestion;