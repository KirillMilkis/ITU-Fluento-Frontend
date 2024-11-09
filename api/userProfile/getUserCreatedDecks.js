import { View, Text } from 'react-native';
import React from 'react';
import config from '../../config/config';

const getUserCreatedDecks = async (username) => {

    try {
        const responce = await fetch(`${config.API_URL}decks/getDecks/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!responce.ok) {
            console.log('Error fetching users decks');
            throw new Error('Failed to fetch users decks');
        }

        const data = await responce.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default getUserCreatedDecks;