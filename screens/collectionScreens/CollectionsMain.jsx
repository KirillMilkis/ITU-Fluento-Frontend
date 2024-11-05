import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import styles from './collectionsMain.styles'
import { ScrollView } from 'react-native-gesture-handler'
import { CollectionTile } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const CollectionsMain = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
        <View style ={styles.topBarWrapper}>
            <Text style={styles.textStyle}>Collections</Text>

        </View>
        <ScrollView>
            <View style ={styles.tileNavList}>
              <TouchableOpacity onPress={()=>navigation.navigate("CommunityCollections")}>
                <View style ={styles.tileNavigator}>
                  <Icon name="earth-outline" size={38} color="black" style={styles.spacing} />
                  <Text style={styles.textStyle2}>Explore new Collections</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("NewCollectionForm")}>
                <View style ={styles.tileNavigator}>
                  <Icon name="add-outline" size={38} color="black" style={styles.spacing} />
                  <Text style={styles.textStyle2}>Create own collection</Text>
                </View>
              </TouchableOpacity>
            </View>   
            <View style={styles.savedCollectionsList}>
                <Text style={[styles.textStyle3, styles.spacingTitles]}>Saved Collections</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("")}>
                <View style={styles.yourCollectionsTile}>
                  <Text style={styles.textStyle3}>Your Collections</Text>
                  <Icon name="chevron-forward-outline" size={38} color="black" style={styles.spacing} />
                </View> 
                </TouchableOpacity>
                


              
                <CollectionTile/>
                <CollectionTile/>
                <CollectionTile/>
            </View>   
        </ScrollView>  
    </SafeAreaView>
  )
}

export default CollectionsMain

