import { TouchableOpacity, View, Text, Alert} from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import styles from './collectionTile.styles'
import { FlashCardsListScreen } from '../../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../App.js'
import usePostRequest from '../../api/usePostRequest'
import { postRequest } from '../../api/index.js'
import { useFocusEffect } from '@react-navigation/native'

const CollectionTile = ({deckItem, isCreator, liked}) => {
    const navigation = useNavigation();

    const [likedNow, setLikedNow] = useState(liked);


      const onSubmitLike = useCallback(async () => {
        try {
            endpoint = `decks/${deckItem.ID}/like`;
            postData = {
                username: "Alice",
            };
    
            const result = await postRequest(endpoint, postData);
            
            // Если запрос успешен, обновляем состояние
            if (result && result.success) {
              console.log(result.success);
                deckItem.likeCount++;
                setLikedNow(!likedNow);
            }
        } catch (error) {
            console.error(error);
        } finally {
           
        }
    });
    
    const onSubmitUnLike = useCallback(async () => {
        try {
          endpoint = `decks/${deckItem.ID}/unlike`;
          postData = {
              username: "Alice",
          };
            // Отправляем POST-запрос
            const result = await postRequest(endpoint, postData);
            
            // Если запрос успешен, обновляем состояние
            if (result && result.success) {
               console.log(result.success);
                deckItem.likeCount--;
                setLikedNow(!likedNow);
            }
        } catch (error) {
            console.error(error);
        } finally {
           
        }
    } );

    const handleDelete = async () => {
        try {
            endpoint = `decks/${deckItem.ID}/delete`;
            const result = await postRequest(endpoint);
          } catch (error) {
            console.error(error);
          } finally {
            setModalVisible(false)
          }
    }

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

    if (deckItem.creator == "Alice"){
        isCreator = true;
    } else {   
        isCreator = false;
    }


  return (
    <TouchableOpacity onPress={()=>navigation.navigate("FlashCardsListScreen", {deckItem: deckItem, isCreator: isCreator })} onLongPress={handleLongPress}>
        <View style ={styles.tileContainer}>
            <Image source={require('../../assets/favicon.png')} style={styles.imageStyle}/>
            <View style={styles.textContainerColumn}>
                <Text style={styles.textStyle} numberOfLines={1}>{deckItem.name}</Text>
                <View style={styles.TextContainerRow}>
                    <Text style={styles.textStyle2}>5 items</Text>
                    <Text style={styles.textStyle2} numberOfLines={1}>by {deckItem.creator}</Text>
                </View>
            </View>

                <View style={styles.likesContainerColumn}>
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
  )
};

export default CollectionTile