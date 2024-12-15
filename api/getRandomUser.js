import { View, Text } from 'react-native';
import React from 'react';
import config from '../config/config';

const getRandomUser = async () => {
    try {
        const response = await fetch(`https://itu-projekt-psi.vercel.app/api/user/getRandom`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Error getting random user');
            throw new Error('Failed to get random user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getRandomUser;