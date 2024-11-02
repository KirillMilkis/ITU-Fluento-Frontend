import { View, Text } from 'react-native'
import { Image } from 'react-native'
import React from 'react'
import styles from './savedcollection.styles'

const SavedCollectionTile = () => {
  return (
    <View>
      <View style ={styles.tileWrapper}>
        <View style ={styles.tileForm}>
            <Image source={require('../../assets/favicon.png')} style={styles.imageStyle}/>
            <Text style={styles.textStyle}>Vegetables</Text>
        </View>
    </View>
    </View>
  )
};

export default SavedCollectionTile