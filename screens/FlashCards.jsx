import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './flashCards.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardTile } from '../components'
import Icon from 'react-native-vector-icons/Ionicons'

const FlashCards = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Flash Cards</Text>

            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="black" />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={styles.flashCardContainer}>
                <FlashCardTile/>
                <FlashCardTile/>
                <FlashCardTile/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default FlashCards
