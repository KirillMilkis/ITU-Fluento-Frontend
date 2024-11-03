import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './flashCard.styles'
import { useNavigation } from '@react-navigation/native'

const FlashCardTile = () => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('FlashCardDetails')}>
        <View style={styles.flashCard}>
            <View style={styles.flashCardTop}>
                <Text style={styles.flashCardText}>Question</Text>
            </View>
            <View style={styles.flashCardBottom}>
                <Text style={styles.flashCardText}>Answer</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default FlashCardTile