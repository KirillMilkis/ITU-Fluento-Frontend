import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, {useCallback, useEffect} from 'react'
import FlashCardListTile from './FlashCardListTile';
import useFetch  from '../../api/useFetch'
import styles from './flashCardList.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { fetchRequest } from '../../api';

const FlashCardList = ({deckId, isCreator}) => {

  let endpoint = `decks/${deckId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // const {data, isLoading, error, refetch} = useFetch(endpoint);


  
  // useCallback(() => {
  //   // Refetch the data when the screen comes into focus
  //   refetch();

  const fetchData = async () => {
    try {
      const result = await fetchRequest(endpoint);
      if (result.success) {
        setData(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchData()
  // });


  useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [endpoint])
);

 

  return (
    <View>
    <ScrollView>
            <View style={styles.container}>
            {data.map((cardItem) => (
            <FlashCardListTile
              key={cardItem.ID}
              cardItem={cardItem}
              isCreator={isCreator}
            />
          ))}
            </View>
    </ScrollView>
    </View>
  )
  

}


export default FlashCardList