/*
 * File: getQuestionById.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note: Fetches questions data by ID.
 */
import config from '../../config/config';

const getQuestionById = async (questionID) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/question/${questionID}`,
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

export default getQuestionById;