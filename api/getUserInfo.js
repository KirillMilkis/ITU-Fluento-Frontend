/*
 * File: getUserInfo.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import config from '../config/config';

const getUserInfo = async (username) => {
    try {
        const responce = await fetch(`${config.API_URL}user/${username}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!responce.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await responce.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export default getUserInfo;