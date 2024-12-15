/*
 * File: updateMultipleChoice.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const updateMultipleChoice = async (
    id,
    question,
    imagePath,
    answer,
    options,
) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/multiple-choice/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: question,
                    options: options,
                    correctOption: answer,
                    imagePath,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update True/False question');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateMultipleChoice;