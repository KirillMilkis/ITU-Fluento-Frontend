import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './collectionsList.styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { CollectionTile } from '../../components'

const CollectionsList = () => {

    const navigation = useNavigation();

  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Community collections</Text>

            <Icon name="arrow-back-outline" size={38} color="transparent" />
        </View>


        <ScrollView>
            <View style={[styles.collectionsListContainer, styles.spacing]}>
                <CollectionTile/>
                <CollectionTile/>
                <CollectionTile/>
            </View>


        </ScrollView>
          

    </SafeAreaView>
  )
}

export default CollectionsList