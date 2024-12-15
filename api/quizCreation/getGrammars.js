/*
 * File: getGrammars.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 15.12.2024
 * Note: Returns all grammars.
 */
import config from '../../config/config';

const getGrammars = async () => {
    try {
        const response = await fetch(`${config.API_URL}grammar/get/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

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

export default getGrammars;