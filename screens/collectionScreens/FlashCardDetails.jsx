import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './flashCardDetails.styles'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState, useRef } from 'react'

const FlashCardDetails = ({cardItem}) => {

  const navigation = useNavigation()

    if (!cardItem){
        navigation.goBack();
    }

    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;
  
    const frontInterpolate = flipAnim.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
  
    const backInterpolate = flipAnim.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  
    const flipToFront = () => {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    };
  
    const flipToBack = () => {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    };
  
    const handlePress = () => {
      if (flipped) {
        flipToFront();
      } else {
        flipToBack();
      }
      setFlipped(!flipped);
    };
  
    const frontAnimatedStyle = {
      transform: [{ rotateY: frontInterpolate }],
    };
  
    const backAnimatedStyle = {
      transform: [{ rotateY: backInterpolate }],
    };

  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Flash Card</Text>

            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="transparent" />
            </TouchableOpacity>
        </View>


        <View style={styles.flashCardContainer}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View>
                <Animated.View style={[styles.flashCard, styles.frontCard, frontAnimatedStyle]}>
                    <Text style={styles.textStyle2}>{cardItem.question}</Text>
                </Animated.View>
                <Animated.View style={[styles.flashCard, styles.backCard, backAnimatedStyle]}>
                    <Text style={styles.textStyle2}>{cardItem.answer}</Text>
                </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>


        
    </SafeAreaView>
  )
}

export default FlashCardDetails