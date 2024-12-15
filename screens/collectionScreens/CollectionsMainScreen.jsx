/**
 * File: CollectionsMainScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import styles from './collectionsMainScreen.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { CollectionList } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const CollectionsMainScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View style={styles.mainWrapper}>
        <View style ={styles.topBarWrapper}>
              <Text style={styles.textStyle}>Collections</Text>

          </View>
            <ScrollView>
                <View style ={styles.tileNavList}>
                  <TouchableOpacity onPress={()=>navigation.navigate("CollectionListScreen", { title: "Community collections", propertyType: "all"})}>
                    <View style ={styles.tileNavigator}>
                      <Icon name="earth-outline" size={38} color="black" style={styles.spacing} />
                      <Text style={styles.textStyle2}>Explore new Collections</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate("NewCollectionFormScreen")}>
                    <View style ={styles.tileNavigator}>
                      <Icon name="add-outline" size={38} color="black" style={styles.spacing} />
                      <Text style={styles.textStyle2}>Create own collection</Text>
                    </View>
                  </TouchableOpacity>
                </View>   
                <View style={styles.savedCollectionsList}>
                    <Text style={[styles.textStyle3, styles.spacingTitles]}>Saved Collections</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("CollectionListScreen", { title: "Your collections", propertyType: "created"})}>
                    <View style={styles.yourCollectionsTile}>
                      <Text style={styles.textStyle3}>Your Collections</Text>
                      <Icon name="chevron-forward-outline" size={38} color="black" style={styles.spacing} />
                    </View> 
                    </TouchableOpacity>
                    <CollectionList propertyType = {"liked"}/>
                </View>   
            </ScrollView>  


       </View>
    </SafeAreaView>
  )
}

export default CollectionsMainScreen

