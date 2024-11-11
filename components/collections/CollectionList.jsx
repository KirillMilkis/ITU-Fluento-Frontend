import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CollectionTile } from '../'
import styles from './collectionList.styles'
import { ScrollView } from 'react-native-gesture-handler'
import useFetch  from '../../api/useFetch'
import { COLORS } from '../../constants/theme'
import { set } from 'react-hook-form'


const CollectionList = ({propertyType}) => {

    const [endpoint, setEndpoint] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

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
    const { data, isLoading: isLoading1, error: error1 } = useFetch(endpoint);
    const { data: likedData, isLoading: isLoading2, error: error2} = useFetch("decks/getLikedDecks/Alice");

    useEffect(() => {
        if (propertyType === "all" && data && likedData) {
            let filtered = data.filter(item => item.creator !== "Alice");
            const likedDataIds = likedData.map(item => item.ID);
            filtered = filtered.filter(item => !likedDataIds.includes(item.ID));
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [data, likedData, propertyType]);

  

  return (
    
    <ScrollView>
         <View style={[styles.container, styles.spacing]}>
            {isLoading1 || isLoading2 ? (
            <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
            ): error1 ? (
            <Text>Error: {error1.message}</Text>
            ): error2 ? (
            <Text>Error: {error2.message}</Text>
            ): (
            <FlatList
                data = {filteredData}
                renderItem = {({item}) => <CollectionTile deckItem = {{...item}} isCreator = {item.creator === "Alice"} liked =  {propertyType === "liked"}/>}
                keyExtractor = {(item) => item.ID}
                vertical = {true}
                contentContainerStyle = {{gap: 14}}
            />
            )}
        </View>

    </ScrollView>
   

  )
}

export default CollectionList