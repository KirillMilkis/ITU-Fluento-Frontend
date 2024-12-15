import config from '../config/config';

const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${config.API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200 || response.status === 201 || response.status === 204) {
            const responseData = await response.json();
            console.log(responseData);
            return { success: true, message: responseData };
        } else {
            const errorData = await response.json();
            console.log('Error post request', errorData);
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        console.error('Request failed:', error);
        return { success: false, message: error.message };
    }
}

export default postRequest;