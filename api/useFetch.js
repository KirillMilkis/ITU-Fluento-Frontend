/*
 * File: useFetch.js
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 11.11.2024
 * Note:
 */

import config from '../config/config';
import {useState, useEffect} from 'react'
import axios from 'axios';

const useFetch = (endpoint, options = {}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async (endpoint, options) => {
        console.log(`${config.API_URL}${endpoint}`);
        setIsLoading(true);

        try {
            const response = await axios.get(`${config.API_URL}${endpoint}` , {
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                  ...options.headers,
                },
              });
            setData(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);  
        } finally {
            setIsLoading(false);
        }

    }


    useEffect(() => {
        if (endpoint){
            fetchData(endpoint, options);
        }
    }, [endpoint]);

    const refetch = () => {
        setIsLoading(true);
        fetchData(endpoint, options);
    }




  return { data, isLoading, error, refetch}

}

export default useFetch