/*
 * File: updateFillInBlank.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const updateFillInBlank = async (id, options) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/fill-in-blank/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: options.question,
                    data: options.options,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update Image Recognition question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateFillInBlank;