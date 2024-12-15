/*
 * File: updateTrueFalse.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const updateTrueFalse = async (id, questions) => {
    try {
        // Prepare the request body
        const requestBody = {
            data: {
                q1: questions.q1 || 'Default',
                a1: questions.a1 || '0',
                q2: questions.q2 || 'Default',
                a2: questions.a2 || '0',
                q3: questions.q3 || 'Default',
                a3: questions.a3 || '0',
            },
        };

        // Send the request
        const response = await fetch(
            `${config.API_URL}quizzes/true-false/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update True/False question');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default updateTrueFalse;