/**
 * File: CollectionTile.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.1.2024
 * 
 */
import { TouchableOpacity, View, Text, Alert} from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import styles from './collectionTile.styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { postRequest } from '../../api/index.js'
import config from '../../config/config'

const CollectionTile = ({deckItem, isCreator, liked, setReload}) => {

    const navigation = useNavigation();

    // Liked state of the deck to save requests to the server, put the like on the frontend
    // It will be refetched next time the screen is opened
    const [likedNow, setLikedNow] = useState(liked); 

    /**
     * @brief Function to handle like button press and send POST request to like the deck
     * 
     * @returns {void}
     */
      const onSubmitLike = useCallback(async () => {
        try {
            endpoint = `decks/${deckItem.ID}/like`;
            postData = {
                username: `${config.USERNAME}`,
            };
    
            const result = await postRequest(endpoint, postData);
            
            if (result && result.success) {
              console.log(result.success);
              // Put the like on the frontend to not refetch the data
                deckItem.likeCount++;
                setLikedNow(!likedNow);
            }
            if(!result.success){
                throw new Error(result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
              'Like Failed',
              'There was an issue liking the collection. Please try again.',
              [{ text: 'OK' }]
              );
        } 
    });
    /**
     * @brief Function to handle unlike button press and send POST request to unlike the deck
     * 
     * @returns {void}
     */
    const onSubmitUnLike = useCallback(async () => {
        try {
          endpoint = `decks/${deckItem.ID}/unlike`;
          postData = {
              username: `${config.USERNAME}`,
          };
            const result = await postRequest(endpoint, postData);

            if (result && result.success) {
               console.log(result.success);
               // Remove the like on the frontend to not refetch the data
                deckItem.likeCount--;
                setLikedNow(!likedNow);
            }
            if(!result.success){
                throw new Error(result.message);
            } 
        } catch (error) {
            console.error(error);
            Alert.alert(
              'Unlike Failed',
              'There was an issue unliking the flash card. Please try again.',
              [{ text: 'OK' }]
              );
        } 
    } );

    /**
     * @brief Function to send a POST request to delete the deck
     * 
     * @returns {void}
     */
    const handleDelete = async () => {
        try {
            endpoint = `decks/${deckItem.ID}/delete`;
            const result = await postRequest(endpoint);
            if(!result.success){
                throw new Error(result.message);
            }
          } catch (error) {
            console.error(error);
            Alert.alert(
              'Delete Failed',
              'There was an issue deleting the collection. Please try again.',
              [{ text: 'OK' }]
              );
          } finally {
            console.log("Deleted deck");
            setReload(true);
            setModalVisible(false);
           
          }
    }

    /**
     * @brief Function to handle long press on the tile and ask for confirmation to delete the deck
     * 
     * @returns {void}
     *   
     */ 
    const handleLongPress = () => {
        if (isCreator) {
            Alert.alert(
                "Delete Item",
                "Are you sure you want to delete this item?",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text: "Delete",
                    onPress: () => handleDelete(),
                    style: "destructive"
                  }
                ]
              );
        }
        
      };

    if (!deckItem) {
        return null; // Render nothing if item is undefined or null
      }


  return (
    <>
      <TouchableOpacity onPress={()=>navigation.navigate("FlashCardsListScreen", {deckItem: deckItem, isCreator: isCreator, isLiked: liked })} onLongPress={handleLongPress}>
      <View style ={styles.tileContainer}>
          <Image source={require('../../assets/box.png')} style={styles.imageStyle}/>
          <View style={styles.textContainerColumn}>
              <Text style={styles.textStyle} numberOfLines={1}>{deckItem.name}</Text>
              <View style={styles.TextContainerRow}>
                  <Text style={styles.textStyle2}>{deckItem.flashcardCount} items</Text>
                  <Text style={styles.textStyle2} numberOfLines={1}>by {deckItem.creator}</Text>
              </View>
          </View>

              <View style={styles.likesContainerColumn}>
                {/* Like button and count of likes   */}
                {/* If the user is creator of the deck, he cannot like it */}
              {isCreator ? (
                  <>
                  <Icon name="heart-half-outline" size={38} color="black" />
                  <Text style={styles.textStyle2}>{deckItem.likeCount}</Text>
                  </>
              ) : (
                  <>
                  {likedNow ? (
                  <TouchableOpacity onPress={onSubmitUnLike}>
                  <Icon name="heart" size={38} color="black" />
                  <Text style={styles.textStyle2}>{deckItem.likeCount}</Text>
                  </TouchableOpacity>
                  ) : (
                  <TouchableOpacity onPress={onSubmitLike}>
                  <Icon name="heart-outline" size={38} color="black" />
                  <Text style={styles.textStyle2}>{deckItem.likeCount}</Text>
                  </TouchableOpacity>
                  )}
                  </>
              )}
              </View>
              </View>
      </TouchableOpacity>
    </>
  )
};

export default CollectionTile