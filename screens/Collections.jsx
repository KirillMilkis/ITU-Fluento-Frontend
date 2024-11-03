import { StyleSheet, Text, Touchable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import styles from './collections.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { CollectionTile } from '../components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const Collections = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
        <View style ={styles.topBarWrapper}>
            <Text style={styles.textStyle}>Collections</Text>

        </View>
        <ScrollView>
            <View style ={styles.tileNavContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate("CollectionsList")}>
                <View style ={styles.tileNavigator}>
                  <Icon name="earth-outline" size={38} color="black" style={styles.spacing} />
                  <Text style={styles.textStyle2}>Explore new Collections</Text>
                </View>
              </TouchableOpacity>
                <View style ={styles.tileNavigator}>
                  <Icon name="add-outline" size={38} color="black" style={styles.spacing} />
                  <Text style={styles.textStyle2}>Create own collection</Text>
                </View>
            </View>   
            <View style={styles.savedCollectionsContainer}>
                <Text style={[styles.textStyle3, styles.spacingTitles]}>Saved Collections</Text> 
                <CollectionTile/>
                <CollectionTile/>
                <CollectionTile/>
            </View>   
        </ScrollView>  
    </SafeAreaView>
  )
}

export default Collections

