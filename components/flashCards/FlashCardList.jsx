/*
 * File: FlashCardList.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 * Note: 
 */
import { View, ScrollView, ActivityIndicator } from 'react-native'
import React, {useCallback} from 'react'
import FlashCardListTile from './FlashCardListTile';
import styles from './flashCardList.styles';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { fetchRequest } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import config from '../../config/config'

// deckId - ID of the deck to fetch flashcards from
// isCreator - boolean value to check if the user is the creator of the deck
// sortByAttemps - boolean value to check if the flashcards should be sorted by by the results of the solved flashcards
// isAnswersHidden - boolean value to check if the answers on the falshcard tile should be hidden
const FlashCardList = ({deckId, isCreator, sortByAttemps, isAnswersHidden}) => {

  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(true); // Loading state for the fetch
  const [data, setData] = useState([]); // Data to show
  const [cardIds, setCardIds] = useState([]); // Save card IDs to use it in flash card details screen to navigate between cards 

  /**
   * @brief Function to fetch flashcards from the server
   * 
   * @returns {void}
   */
  const fetchData = async () => {
    try {
      let endpoint;
      // Two different endpoints for sorting by attemps and not
      // FlashCard will be sorted from the most successful for the user to the least
      if(sortByAttemps){
        endpoint = `decks/${deckId}/${config.USERNAME}`;
      } else {
        endpoint = `decks/${deckId}`;
      }
      const result = await fetchRequest(endpoint);
      console.log(result);
      if (result.success) {
        setData(result.message);
        setCardIds(result.message.map((item) => sortByAttemps ? item.flashcardID : item.ID));
        console.log(cardIds);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Fetch Failed',
        'There was an issue loading the flashcards. Please try again.',
        [{ text: 'OK' }]
        );
        navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch data on the screen focus
  useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [sortByAttemps])
  );

 
  return (
    <View>
    <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              {/* Show loading indicator while fetching data */}
        {isLoading ? (
            <ActivityIndicator size="large" color="#bbbbb" alignSelf="" />
          ) : (
            <>
              {data.map((cardItem) => (
                <FlashCardListTile
                  key={cardItem.ID || cardItem.flashcardID}
                  cardItem={cardItem}
                  isCreator={isCreator}
                  isAnswerHidden={isAnswersHidden}
                  cardIds={cardIds}
                />
              ))}
            </>
          )
        }
        </View>
    </ScrollView>
    </View>
  )
  

}


export default FlashCardList