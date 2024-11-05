import { View, Text } from 'react-native'
import {useState, useEffect} from 'react'
import axios from 'axios';


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (url) => {
        setIsLoading(true);

        try {
            const response = await axios.get(url);
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
        fetchData(url);
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }




  return { data, isLoading, error, refetch}

}

export default useFetch