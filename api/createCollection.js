import { View, Text } from 'react-native'
import React from 'react'

const createCollection = async (collectionName) => {

    try {
        const responce = await fetch('https://itu-projekt-psi.vercel.app/api/decks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'username',
                deckname: collectionName,
            }),
        });

        if (!responce.ok) {
            console.log('Collection created');
            throw new Error('Failed collection creation')
        }

        const data = await responce.json();
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default createCollection