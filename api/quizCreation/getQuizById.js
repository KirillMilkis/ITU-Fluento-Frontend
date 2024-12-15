/*
 * File: getQuizById.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note: Fetches current quiz data by ID.
 */
import config from '../../config/config';

const getQuizById = async (quizId) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/quiz/${quizId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default getQuizById;