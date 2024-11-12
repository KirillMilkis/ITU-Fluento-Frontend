import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './flashCardsListScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardList } from '../../components'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const FlashCardsListScreen = ({route}) => {

  const {deckItem, isCreator} = route.params;




  const navigation = useNavigation();
  
  // let ownCards;

  // useEffect(() => {
  //   if(propertyType == "created"){
  //     ownCards = true;
  //   } else{
  //     ownCards = false;
  //   }
  // }, [propertyType]);

  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Flash Cards</Text>

            {isCreator ? (
              <TouchableOpacity onPress={()=>navigation.navigate("NewFlashCardForm", { deckId: deckItem.ID, isCreator: isCreator })}>
              <Icon name="add-outline" size={38} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={()=>{}}>
              <Icon name="heart-outline" size={38} color="black" />
              </TouchableOpacity>
              )}
            
        </View>
          <FlashCardList deckId = {[deckItem.ID]} isCreator={isCreator}/>
    </SafeAreaView>
  )
}

export default FlashCardsListScreen
