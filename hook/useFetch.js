import { View, Text } from 'react-native'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { set } from 'react-hook-form';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async (url) => {
        setIsLoading(true);

        try {
            const response = await axios.get(url);
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }

    }


    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }




  return { data, isLoading, error, refetch}

}

export default useFetch