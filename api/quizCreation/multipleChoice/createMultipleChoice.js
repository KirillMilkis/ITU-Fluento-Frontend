/*
 * File: createMultipleChoice.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const createMultipleChoice = async (
    quizID,
    question,
    imagePath,
    answer,
    options,
) => {
    try {
        // Prepare the request body
        const requestBody = {
            quizID,
            description: question,
            mistakeCategory: 'general',
            correctOption: answer,
            options: {
                optionA: options.optionA,
                optionB: options.optionB,
                optionC: options.optionC,
                optionD: options.optionD,
            },
            imagePath,
        };

        const response = await fetch(
            `${config.API_URL}quizzes/multiple-choice`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to create Multiple Choice question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default createMultipleChoice;