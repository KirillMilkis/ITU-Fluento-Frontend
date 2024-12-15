/*
 * File: updateUserProfile.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 12.11.2024
 * Note:
 */
import config from '../../config/config';

const updateUserProfile = async (
    username,
    newUsername,
    profileImage,
    gender,
    languageLevel,
    dailyGoal,
) => {
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

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    }
    catch (error) {
        console.error('Request failed:', error);
        return { success: false, message: error.message };
    }
};

export default updateUserProfile;