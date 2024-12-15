/*
 * File: updateWordOrdering.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const updateWordOrdering = async (id, question, options) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/ordering/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: question,
                    options,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update Word Ordering question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateWordOrdering;