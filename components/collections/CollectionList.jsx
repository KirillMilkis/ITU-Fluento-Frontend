/**
 * File: CollectionList.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 9.12.2024
 * 
 */
import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CollectionTile } from '../'
import styles from './collectionList.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { fetchRequest } from '../../api'
import { Alert } from 'react-native'
import config from '../../config/config'


const CollectionList = ({propertyType, refresh}) => {

    const [endpoint, setEndpoint] = useState(null); // Endpoint to fetch data
    const [filteredData, setFilteredData] = useState([]); // Filtered data to show
    const [isLoading, setIsLoading] = useState(true); 

    const [reload, setReload] = useState(false); // Reload state to refresh the data


    // Set endpoint based on propertyType, exist different collection list in different parts of the app
    useEffect(() => {
        console.log(`${config.USERNAME}`);
        if (propertyType === "created") {
            setEndpoint(`decks/getDecks/${config.USERNAME}`); // Fetch decks created by specific user
        } else if (propertyType === "all") {
            setEndpoint("decks/getDecks"); // Fetch all community decks
        } else if (propertyType === "liked") {
            console.log(`${config.USERNAME}`);
            setEndpoint(`decks/getLikedDecks/${config.USERNAME}`); // Fetch liked decks by specific user
        }
    }, [propertyType]);

    /**
     * @bried Fetch collections from the server
     * 
     * @returns {Promise<void>}
     */
    const fetchData = async () => {
        try {
            const result1 = await fetchRequest(endpoint);
            if (result1.success) {
                // If propertyType is "all", skip decks created by specific user and already liked by specific user
                if (propertyType === "all") {
                    let filtered = result1.message.filter(item => item.creator !== `${config.USERNAME}`);
                    const result2 = await fetchRequest(`decks/getLikedDecks/${config.USERNAME}`);
                    const likedDataIds = result2.message.map(item => item.ID);
                    filtered = filtered.filter(item => !likedDataIds.includes(item.ID));
                    setFilteredData(filtered);
                } else{
                    setFilteredData(result1.message);
                }
                
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Fetch Failed',
                'There was an issue fetching the collection list. Please try again.',
                [{ text: 'OK' }]
                );
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch data or refetch when screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchData();
            setReload(false);
        }, [endpoint, reload])
    );


  return (
    <View>
        <ScrollView style={styles.scrollContainer}>
            <View style={[styles.container]}>
                {/* Show loading indicator while fetching data */}
                {isLoading ? (
                <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
                ):(
                    filteredData.map((item) => (
                    <CollectionTile
                    key={item.ID}
                    deckItem={{ ...item }}
                    isCreator={item.creator === `${config.USERNAME}`}
                    liked={propertyType === "liked"}
                    setReload={setReload}
                    reload={setReload}
                    />
                ))
                )}
            </View>

        </ScrollView>
    </View>

   

  )
}

export default CollectionList