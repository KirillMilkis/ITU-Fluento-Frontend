import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, {useCallback, useEffect} from 'react'
import FlashCardListTile from './FlashCardListTile';
import useFetch  from '../../api/useFetch'
import styles from './flashCardList.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const FlashCardList = ({deckId, refresh}) => {

  let endpoint = `decks/${deckId}`;

  const {data, isLoading, error, refetch} = useFetch(endpoint);

  
  // useCallback(() => {
  //   // Refetch the data when the screen comes into focus
  //   refetch();

  useFocusEffect(
    useCallback(() => {
        refetch();
      }, [refresh])
  );


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
                    renderItem = {({item}) => <FlashCardListTile cardItem = {item}/>}
                    keyExtractor = {(item) => item.ID}
                    vertical = {true}
                    contentContainerStyle = {{gap: 14}}
                />
            )}
            </View>
    </ScrollView>
  )
  

}


export default FlashCardList