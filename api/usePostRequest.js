import { View, Text } from 'react-native'
import React from 'react'
import config from '../config/config';
import {useState, useEffect} from 'react'
import axios from 'axios';

const usePostRequest = (endpoint, data) => {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(false);

    const postData = async (endpoint, data) => {
   
            try {
                const response = await axios.post(`${config.API_URL}${endpoint}`,data , {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response.status);
                if(response.status !== 200 && response.status !== 201){
                    
                    throw new Error(response.message);
                }
    
    
                setResult({success: true, data: response.data});
            } catch (error) {
                setError(error);
                setResult({success: false, data: null});
            }



        }
       

    useEffect(() => {
        if (endpoint && data){
            postData(endpoint, data);
        }
    }, [endpoint, data]);



    return { result, error }

    
}

export default usePostRequest