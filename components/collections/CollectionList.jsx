import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CollectionTile } from '../'
import styles from './collectionList.styles'
import { ScrollView } from 'react-native-gesture-handler'
import useFetch  from '../../api/useFetch'
import { COLORS } from '../../constants/theme'
import { set } from 'react-hook-form'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { fetchRequest } from '../../api'
import { isLoaded } from 'expo-font'


const CollectionList = ({propertyType, refresh}) => {

    const [endpoint, setEndpoint] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(propertyType);

    useEffect(() => {
        if (propertyType === "created") {
            setEndpoint("decks/getDecks/Alice");
        } else if (propertyType === "all") {
            setEndpoint("decks/getDecks");
        } else if (propertyType === "liked") {
            setEndpoint("decks/getLikedDecks/Alice");
        }
    }, [propertyType]);


    // useEffect(() => {
    //    fetchData();
    // }, [endpoint]);

    const fetchData = async () => {
        try {
            const result1 = await fetchRequest(endpoint);
            if (result1.success) {
                if (propertyType === "all") {
                    let filtered = result1.message.filter(item => item.creator !== "Alice");
                    const result2 = await fetchRequest("decks/getLikedDecks/Alice");
                    const likedDataIds = result2.message.map(item => item.ID);
                    filtered = filtered.filter(item => !likedDataIds.includes(item.ID));
                    setFilteredData(filtered);
                } else{
                    setFilteredData(result1.message);
                }
                
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [endpoint])
    );


  return (
    <View>
        <ScrollView>
            <View style={[styles.container, styles.spacing]}>
                {isLoading ? (
                <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
                ):(
                    filteredData.map((item) => (
                    <CollectionTile
                    key={item.ID}
                    deckItem={{ ...item }}
                    isCreator={item.creator === "Alice"}
                    liked={propertyType === "liked"}
                    />
                ))
                )}
            </View>

        </ScrollView>
    </View>

   

  )
}

export default CollectionList