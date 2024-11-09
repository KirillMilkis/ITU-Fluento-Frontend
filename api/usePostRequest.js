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
                    console.log(response.status);
                    throw new Error('Failed request');
                }
                console.log(response.status);
    
    
                setResult(response.data);
            } catch (error) {
                setError(error);
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