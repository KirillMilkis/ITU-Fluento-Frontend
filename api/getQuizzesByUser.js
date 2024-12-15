/*
 * File: getQuizzesByUser.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../config/config';

const getQuizzesByLevel = async (username) => {
    try {
        const responce = await fetch(
            `${config.API_URL}quizzes/quiz/createdBy/${username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!responce.ok) {
            throw new Error('Failed to fetch quizzes');
        }

        const data = await responce.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default getQuizzesByLevel;