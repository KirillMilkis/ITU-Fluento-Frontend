/*
 * File: addGrammar.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note: Adds grammar screen with ID=grammarID for quiz with ID=quizID
 */
import config from '../../config/config';

const addGrammar = async (quizID, grammarID) => {
    try {
        const response = await fetch(
            `${config.API_URL}grammar/${grammarID}/${quizID}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error('Failed to fetch grammar data');
        }

        const data = await response.json();
        return data;
    }
	catch (error) {
        console.error(error);
        throw error;
    }
};

export default addGrammar;