import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './flashCardListTile.styles'
import { useNavigation } from '@react-navigation/native'

const FlashCardListTile = ({cardItem}) => {
    const navigation = useNavigation()

    if (!cardItem){
        return null;
    }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FlashCardDetails', { cardItem: cardItem })}>
        <View style={styles.flashCard}>
            <View style={styles.flashCardTop}>
                <Text style={styles.flashCardText}>{cardItem.question}</Text>
            </View>
            <View style={styles.flashCardBottom}>
                <Text style={styles.flashCardText}>{cardItem.answer}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default FlashCardListTile