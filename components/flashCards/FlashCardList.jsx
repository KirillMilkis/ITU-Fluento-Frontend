import { View, Text } from 'react-native'
import React from 'react'
import FlashCardListTile from './FlashCardListTile';

const FlashCardList = ({deckId}) => {

  let url = `https://itu-projekt-psi.vercel.app/api/decks/{deckId}`;

  return (
    <ScrollView>
            <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
                ): error ? (
                <Text>Error: {error.message}</Text>
                ) : (
                <FlatList
                    data = {data}
                    renderItem = {({item}) => <FlashCardListTile item = {item}/>}
                    keyExtractor = {(item) => item.ID}
                    vertical = {true}
                    contentContainerStyle = {{gap: 14}}
                />
            )}
            </View>
    </ScrollView>
  )



  
  

  const {data, isLoading, error} = useFetch(url);
}


export default FlashCardList