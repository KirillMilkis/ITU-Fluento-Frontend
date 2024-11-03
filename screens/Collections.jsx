import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import styles from './collections.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SavedCollectionTile } from '../components'
import Icon from 'react-native-vector-icons/Ionicons'

const Collections = () => {
  return (
    <SafeAreaView>
        <View style ={styles.topBarWrapper}>
            <Text style={styles.textStyle}>Collections</Text>

        </View>
        <ScrollView>
            <View style ={styles.tileNavContainer}>
                <View style ={styles.tileNavigator}>
                  <Icon name="earth-outline" size={38} color="black" style={styles.spacing} />
                  <Text style={styles.textStyle2}>Explore new Collections</Text>
                </View>
                <View style ={styles.tileNavigator}>
                <Icon name="add-outline" size={38} color="black" style={styles.spacing} />
                <Text style={styles.textStyle2}>Create own collection</Text>
                </View>
            </View>    
            <View style={styles.savedCollectionsContainer}>
                <Text style={styles.textStyle3}>Saved Collections</Text>
                  <SavedCollectionTile/>
                  <SavedCollectionTile/>
                  <SavedCollectionTile/>
            </View>   
        </ScrollView>  
    </SafeAreaView>
  )
}

export default Collections

