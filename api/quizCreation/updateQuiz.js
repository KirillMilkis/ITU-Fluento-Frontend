/*
 * File: updateQuiz.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../config/config';

const updateQuiz = async (quizId, quizName, image) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/quiz/${quizId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: quizName,
                    photo: image,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update quiz');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateQuiz;