/*
File: startQuiz.js
Author: Petra Oravová <xoravo01>
Date Created: 10.11.2024
Note: */
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