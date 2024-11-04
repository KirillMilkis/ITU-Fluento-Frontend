import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { CollectionTile } from '../'
import styles from './collectionList.styles'
import { ScrollView } from 'react-native-gesture-handler'
import useFetch  from '../../hook/useFetch'
import { COLORS } from '../../constants/theme'


const CollectionList = () => {
    const {data, isLoading, error} = useFetch("https://itu-projekt-psi.vercel.app/api/decks/getDecks");

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
                renderItem = {(item) => <CollectionTile item = {item}/>}
                keyExtractor = {(item) => item._id}
                vertical = {true}
                contentContainerStyle = {{gap: 14}}
            />
            )}
        </View>

    </ScrollView>
   

  )
}

export default CollectionList