import { View, Text } from 'react-native'
import { Image } from 'react-native'
import React from 'react'
import styles from './savedcollection.styles'
import Icon from 'react-native-vector-icons/Ionicons'

const SavedCollectionTile = () => {
  return (
    <View>
      <View style ={styles.tileWrapper}>
        <View style ={styles.tileForm}>
            <Image source={require('../../assets/favicon.png')} style={styles.imageStyle}/>
            <View style={styles.textWrapperColumn}>
                <Text style={styles.textStyle}>Vegetables</Text>
                <View style={styles.TextWrapperRow}>
                    <Text style={styles.textStyle2}>5 items</Text>
                    <Text style={styles.textStyle2}>by Anna</Text>
                </View>
            </View>
            <View style={styles.likesWrapperColumn}>
                <Icon name="heart-outline" size={30} color="black" />
                <Text style={styles.textStyle2}>50</Text>
            </View>

        </View>
    </View>
    </View>
  )
};

export default SavedCollectionTile