/*
File: evaluateAnswer.js
Author: Petra Oravová <xoravo01>
Date Created: 12.11.2024
Note: */
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
        console.log(myAnswer)
        if (!response.ok) {
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