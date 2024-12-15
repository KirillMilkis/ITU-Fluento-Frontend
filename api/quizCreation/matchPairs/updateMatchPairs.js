/*
 * File: updateMatchPairs.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note:
 */
import config from '../../../config/config';

const updateMatchPairs = async (id, options) => {
    try {
        const response = await fetch(
            `${config.API_URL}quizzes/matching/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: options.question,
                    pairs: options.pairs,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to update Pair Matching question');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateMatchPairs;