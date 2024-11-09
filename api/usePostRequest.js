import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';

const usePostRequest = async (endpoint, data) => {
    const [error, setError] = useState(null);

    const postData = async (endpoint, data) => {
        try {
            const response = await axios.post(`${config.API_URL}${endpoint}`,data , {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(!response.status === 200){
                throw new Error('Failed request');
            }
            
        } catch (error) {
            setError(error);
        }
    
    }

    useEffect(() => {
        postData(endpoint, data);
    }, []);



    return { error }

    
}

export default usePostRequest