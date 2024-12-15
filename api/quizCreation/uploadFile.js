/*
 * File: uploadFile.js
 * Author: Tomáš Kučera <xkucer0t>
 * Date Created: 14.12.2024
 * Note: Uploades file from device to server, returns server image name
 */
import config from '../../config/config';

const uploadFile = async (fileUri) => {
    try {
        const uriParts = fileUri.split('/');
        const fileName = uriParts[uriParts.length - 1];
        const fileType = fileName.split('.').pop();

        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            name: fileName,
            type: `image/${fileType}`,
        });

        const response = await fetch(`${config.UPLOAD_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data.filename;
    }
    catch (error) {
        console.error('Error in uploadFile:', error);
        throw error;
    }
};

export default uploadFile;
