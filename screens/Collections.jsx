import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import styles from './collections.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SavedCollectionTile } from '../components'

const Collections = () => {
  return (
    <SafeAreaView>
        <View style ={styles.topBarWrapper}>
            <Text style={styles.textStyle}>Collections</Text>

        </View>
        <ScrollView>
            <View style ={styles.tileWrapper}>
                <View style ={styles.tileNavigator}>
                    <Text style={styles.textStyle}> Explore New Collections </Text>
                </View>
                <View style ={styles.tileNavigator}>
                    <Text style={styles.textStyle}>Collection 2</Text>
                </View>
            </View>    
            <View style={styles.savedCollectionsWrapper}>
                <Text style={styles.textStyle2}>Saved Collections</Text>
                  <SavedCollectionTile/>
                  <SavedCollectionTile/>
                  <SavedCollectionTile/>
            </View>   
        </ScrollView>  
    </SafeAreaView>
  )
}

export default Collections

