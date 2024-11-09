import { View, Text } from 'react-native';
import React from 'react';
import config from '../../config/config';

const updateUserProfile = async (username, newUsername, profileImage, gender, languageLevel, dailyGoal) => {

    try {
        const response = await fetch(`${config.API_URL}user/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                newUsername: newUsername,
                profileImage: profileImage ? `${profileImage}.png` : null,
                gender: gender,
                languageLevel: languageLevel,
                dailyGoal: dailyGoal,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            return { success: true, message: data };
        } else {
            const errorData = await response.json();
            console.log('Error updating user information:', errorData);
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        console.error('Request failed:', error);
        return { success: false, message: error.message };
    }
}

export default updateUserProfile;
