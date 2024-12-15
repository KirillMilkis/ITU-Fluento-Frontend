/**
 * File: CollectionListScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 11.11.2024
 * 
 */
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './collectionListScreen.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { CollectionList } from '../../components'
import { useState, useEffect } from 'react' 

const CollectionListScreen = ({route}) => {

    const {title, propertyType} = route.params;
    const navigation = useNavigation();

    const [showTooltip, setShowTooltip] = useState(false);

    // If list shows collections created by user, show tooltip that user can delete collection by long tap
    useEffect(() => {
      if (propertyType === "created") {
          setShowTooltip(true);
          const timer = setTimeout(() => setShowTooltip(false), 2000); 
          return () => clearTimeout(timer);
      }
    }, []);

  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.popToTop()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>
            <View styles={styles.titleContainer}>
              <Text style={styles.textStyle}>{title}</Text>
              {/* Show that user can delete his collection by long tap */}
              {showTooltip && (
              <Text style={styles.tooltip}>Long tap to delete collection</Text>
              )}
            </View>
            {/* Icon to keep the layout and shapes */}
            <Icon name="arrow-back-outline" size={38} color="transparent" />
            
        </View>
        
       
          <CollectionList propertyType = {propertyType}/>
        
          

    </SafeAreaView>
  )
}

export default CollectionListScreen