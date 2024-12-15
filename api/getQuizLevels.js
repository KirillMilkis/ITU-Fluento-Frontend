/*
 * File: getQuestion.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import config from '../config/config';

const getQuizLevels = async () => {
    try {
        const responce = await fetch(
            `${config.API_URL}quizzes/listLanguageLevels`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!responce.ok) {
            throw new Error('Failed to fetch quiz levels');
        }

        const data = await responce.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default getQuizLevels;