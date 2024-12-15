/*
 * File: deleteQuestion.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 13.12.2024
 * Note: Removes question from quiz
 */
import config from '../../config/config';

const deleteQuestion = async (id, type) => {
    if (type === 'multipleChoice') {
        type = 'multiple-choice';
    } else if (type === 'matchingQuestions') {
        type = 'matching';
    } else if (type === 'fillInBlank') {
        type = 'fill-in-blank';
    } else if (type === 'trueFalse') {
        type = 'true-false';
    } else if (type === 'orderingQuestions') {
        type = 'ordering';
    }

    try {
        const response = await fetch(
            `${config.API_URL}quizzes/${type}/delete/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to delete ${type} question`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default deleteQuestion;