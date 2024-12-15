/*
 * File: deleteQuiz.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note:
 */
import config from '../../config/config';

const deleteQuiz = async (quizId) => {
    try {
        const response = await fetch(
            `${config.API_URL}/quiz/delete/${quizId}`,
            {
                method: 'POST',
            },
        );

        if (!response.ok) {
			throw new Error('Failed to delete quiz');
		}
        return await response.json();
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default deleteQuiz;