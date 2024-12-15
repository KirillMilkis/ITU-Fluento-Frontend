/*
 * File: createWordOrdering.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const createWordOrdering = async (quizID, question, options) => {
    try {
        // Prepare the request body
        const requestBody = {
            quizID,
            description: question,
            mistakeCategory: 'general',
            options: options,
        };

        const response = await fetch(`${config.API_URL}quizzes/ordering`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to create Word Ordering question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default createWordOrdering;