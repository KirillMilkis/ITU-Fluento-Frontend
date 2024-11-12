import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './flashCardDetails.styles'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState, useRef } from 'react'
import { postRequest } from '../../api'

const FlashCardDetails = ({route}) => {

  const [popupMessage, setPopupMessage] = useState(''); // To hold popup message
  const [fadeAnim] = useState(new Animated.Value(0)); // For fading the popup

  
  const {cardItem, isCreator} = route.params;
  console.log(isCreator + "isCreator");
  const navigation = useNavigation()

  console.log(isCreator);

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


      const handleDelete = async () => {
        try {
            const endpoint = `flashcards/${cardItem.ID}/delete`;
            const postData = {};
            const result = await postRequest(endpoint, postData);
            console.log(`RESULT IS ${result}`);
            if (result.success) {
                navigation.goBack();
            } else {
                showPopup(result.message);
            }
        } catch (error) {
            console.log(error.message);
            showPopup(error.message || 'An unexpected error occurred');
        }
    };


    const showPopup = (message) => {
      setPopupMessage(message);
      fadeAnim.setValue(0);

      Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
      }).start();

      setTimeout(() => {
          Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
          }).start();
      }, 2000);
    };




  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Flash Card</Text>
            {isCreator ? (

            <TouchableOpacity onPress={handleDelete}>
            <Icon name="trash-outline" size={38} color="red" />
            </TouchableOpacity>

            ) : (
            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="transparent" />
            </TouchableOpacity>
            )}
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

        {popupMessage && (
                            <Animated.View style={[styles.popupContainer, { opacity: fadeAnim }]}>
                                <Text style={styles.popupText}>{popupMessage}</Text>
                            </Animated.View>
                        )}


        
    </SafeAreaView>
  )
}

export default FlashCardDetails