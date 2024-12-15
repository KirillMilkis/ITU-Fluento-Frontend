/*
 * File: createQuiz.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note: Creates new quiz with a given name and image path.
 */
import config from '../../config/config';

const createQuiz = async (quizName, image) => {
    try {
        const response = await fetch(`${config.API_URL}quizzes/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: quizName ?? '',
                photo: image,
                languageLevel: '1',
                username: 'Alice',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create new quiz');
        }

		// Return the new quiz ID
        const data = await response.json();
        return data.id; 
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default createQuiz;