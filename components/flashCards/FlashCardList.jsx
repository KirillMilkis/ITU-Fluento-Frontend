import { View, Text } from 'react-native'
import React from 'react'
import FlashCardListTile from './FlashCardListTile';

const FlashCardList = ({deckId}) => {

  let url = `https://itu-projekt-psi.vercel.app/api/decks/${deckId}`;

  const {data, isLoading, error} = useFetch(url);

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
                    renderItem = {({cardItem}) => <FlashCardListTile cardItem = {cardItem}/>}
                    keyExtractor = {(cardItem) => cardItem.ID}
                    vertical = {true}
                    contentContainerStyle = {{gap: 14}}
                />
            )}
            </View>
    </ScrollView>
  )



  
  

}


export default FlashCardList