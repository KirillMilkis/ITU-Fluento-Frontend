import { TouchableOpacity, View, Text } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styles from './collectionTile.styles'
import { FlashCardsListScreen } from '../../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import App from '../../App.js'

const CollectionTile = ({deckItem, isCreator}) => {
    const navigation = useNavigation();

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
                <Icon name="heart-outline" size={30} color="black" />
                <Text style={styles.textStyle2}>50</Text>
            </View>

        </View>
    </TouchableOpacity>
  )
};

export default CollectionTile