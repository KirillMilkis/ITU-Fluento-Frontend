import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './collectionListScreen.styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { CollectionList } from '../../components'

const CollectionListScreen = ({route}) => {

    const {title, propertyType} = route.params;
    const navigation = useNavigation();

  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.popToTop()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>{title}</Text>

            <Icon name="arrow-back-outline" size={38} color="transparent" />
        </View>

        
        <CollectionList propertyType = {propertyType}/>
          

    </SafeAreaView>
  )
}

export default CollectionListScreen