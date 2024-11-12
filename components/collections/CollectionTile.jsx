import { TouchableOpacity, View, Text } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import styles from './collectionTile.styles'
import { FlashCardsListScreen } from '../../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../App.js'
import usePostRequest from '../../api/usePostRequest'

const CollectionTile = ({deckItem, isCreator, liked}) => {
    const navigation = useNavigation();

  
    const [postData, setPostData] = useState(null);
    const [likedNow, setLikedNow] = useState(liked);

    const [endpoint, setEndpoint] = useState(null);
    const [triggerPost1, setTriggerPost1] = useState(false);


    const { result: result, error: postError } = usePostRequest(endpoint, triggerPost1 ? postData : null);

        

    const onChangeField = useCallback((name) => (text) => {
        setLiked(true);
    });


    const onSubmitLike = useCallback(() => {
        setEndpoint(`decks/${deckItem.ID}/like`);
        setPostData({
            username: "Alice",
        });
        console.log(postData);
        setTriggerPost1(true);
        deckItem.likeCount++;
        }, []);


    const onSubmitUnLike = useCallback(() => {
        setEndpoint(`decks/${deckItem.ID}/unlike`);
        setPostData({
            username: "Alice",
        });
        console.log(postData);
        setTriggerPost1(true);
        deckItem.likeCount--;
        }, []);


    useEffect(() => {
        if (result && result.success) {
            setTriggerPost1(false);
            setLikedNow(!likedNow);
        }
    }, [result, result.success]);


    useEffect(() => {
        if (postError) {
            console.error(postError);
            setTriggerPost1(false);
        }
    }, [postError]);

    

    if (!deckItem) {
        return null; // Render nothing if item is undefined or null
      }

    if (deckItem.creator == "Alice"){
        isCreator = true;
    } else {   
        isCreator = false;
    }


  return (
    <TouchableOpacity onPress={()=>navigation.navigate("FlashCardsListScreen", {deckItem: deckItem, isCreator: isCreator })}>
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