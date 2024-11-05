import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { CollectionTile } from '../'
import styles from './collectionList.styles'
import { ScrollView } from 'react-native-gesture-handler'
import useFetch  from '../../hook/useFetch'
import { COLORS } from '../../constants/theme'


const CollectionList = ({type}) => {

    let url = "";

    if (type === "created") {
        url = "https://itu-projekt-psi.vercel.app/api/decks/getDecks/Alice";
    } else if (type === "all") {   
        url = "https://itu-projekt-psi.vercel.app/api/decks/getDecks";
    }
    

    const {data, isLoading, error} = useFetch(url);

  return (
    
    <ScrollView>
         <View style={[styles.container, styles.spacing]}>
            {isLoading ? (
            <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
            ): error ? (
            <Text>Error: {error.message}</Text>
            ) : (
            <FlatList
                data = {data}
                renderItem = {({item}) => <CollectionTile item = {item}/>}
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