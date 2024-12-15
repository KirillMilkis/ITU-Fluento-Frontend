/*
 * File: createFillInBlank.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const createFillInBlank = async (quizID, question, pairs) => {
    try {
        // Prepare the request body
        const requestBody = {
            quizID,
            description: question,
            mistakeCategory: 'general',
            data: pairs,
        };

		const response = await fetch(`${config.API_URL}quizzes/fill-in-blank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to create Image Recognition question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default createFillInBlank;