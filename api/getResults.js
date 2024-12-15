/*
File: getResults.js
Author: Petra Oravová <xoravo01>
Date Created: 12.11.2024
Note: */
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