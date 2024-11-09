import { View, Text } from 'react-native'
import React from 'react'
import config from '../config/config';
import {useState, useEffect} from 'react'
import axios from 'axios';

const usePostRequest = (endpoint, data) => {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const postData = async (endpoint, data) => {
   
            try {
                console.log(`${config.API_URL}${endpoint}`);
                const response = await axios.post(`${config.API_URL}${endpoint}`,data , {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if(response.status !== 200){
                    throw new Error('Failed request');
                }
                console.log(response.status);
    
    
                setResult({success: true, data: response.data});
            } catch (error) {
                setError(error);
                setResult({success: false, data: error.message});
            }



        }
       

    useEffect(() => {
        if (data){
            postData(endpoint, data);
        }
    }, [endpoint, data]);



    return { result, error }

    
}

export default usePostRequest