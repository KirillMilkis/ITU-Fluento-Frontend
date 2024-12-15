/**
 * File: FlashCardDetailsScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './flashCardDetailsScreen.styles'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState, useRef } from 'react'
import { postRequest } from '../../api'
import { fetchRequest } from '../../api'
import { ScrollView } from 'react-native-gesture-handler'
import config from '../../config/config'

const FlashCardDetailsScreen = ({route}) => {

  const [popupMessage, setPopupMessage] = useState(''); // To hold popup message
  const [fadeAnim] = useState(new Animated.Value(0)); // For fading the popup
  const [reload, setReload] = useState(false); // For children's elements to note that this screen should reload
  const [cardSide, setCardSide] = useState('question'); // To keep track of the side of the card

  const [selectedOption, setSelectedOption] = useState(null); // Opton to rate users knowledge
  const [textSizeAnim] = useState(new Animated.Value(1));  // For animating the text size

  const [currentIndex, setCurrentIndex] = useState(-1); // Index of the current card in the list of cards
  const [cardInfo, setCardInfo] = useState({ question: '', answer: '' , ID: ''}); // Card info from cardItem var

  const navigation = useNavigation()
  
  // cardItem - Contain all card info to display
  // isCreator - if the user is the creator of the card
  // cameFromScreen - the screen from which we came to this screen
  // cardIds - the list of card IDs to switch between cards directly from this screen
  const {cardItem, isCreator, cameFromScreen, cardIds} = route.params;

  const [flipped, setFlipped] = useState(false); // To keep track of the card flip
  const flipAnim = useRef(new Animated.Value(0)).current; // For animating the flip

  /**
   * @brief Function to send a POST request to the server to score the attempt
   * 
   * @param {number} score - The score of the attempt
   * 
   * @returns {void}
   */
  const scoreAttempt = async (score) => {
    try {
        let id;
        // Based on diffrent request how we get flashcards from the server 
        // we can get flashcardID or ID to identify the flashcard.
        cardItem.ID ? id = cardItem.ID : id = cardItem.flashcardID;
        const endpoint = `flashcards/${id}/attempt`;
        console.log(score);
        const postData = { "username": `${config.USERNAME}`, "score": score};
        const result = await postRequest(endpoint, postData);
        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
        showPopup(error.message || 'An unexpected error occurred');
    }
  };

  /**
   * @brief Function to handle the press of an option, to do the animation and score the attempt
   * 
   * @param {number} score - The score of the attempt
   * @param {string} option - The option text
   * 
   * @returns {void}
   */
  const handleOptionPress = (score, option) => {
    if (selectedOption) return; 

    setSelectedOption(option);
    Animated.timing(textSizeAnim, {
        toValue: 1.5, 
        duration: 300,
        useNativeDriver: true,
    }).start(() => {
        scoreAttempt(score);
    });
  };
  
 
  // Interpolations for the flip animation
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  
  /**
   * @brief Function to animate the card flip to the front
   * 
   * @returns {void}
   */
  const flipToFront = () => {
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  /**
   * @brief Function to animate the card flip to the back
   * 
   * @returns {void}
   */
  const flipToBack = () => {
    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };
  
  /**
   * @brief Function to handle the press to choose the side of the card to flip
   * 
   * @returns {void}
   */
  const handlePressToTurnSide = () => {
    if (flipped) {
      setCardSide('question');
      flipToFront();
    } else {
      setCardSide('answer');
      flipToBack();
    }
    setFlipped(!flipped);
  };

  // Styles for the front and back of the card based on the flip animation
  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  /**
   * @brief Function to fetch the card data from the server
   * 
   * @returns {void}
   * 
   * Notes: function called only when we change the card from this screen(edit or go to the next or prev card), when we come 
   * to this screen from the flashcard list screen we already have the card data. 
   */
  const fetchCardData = async () => {
    let result;
    try {
      const endpoint = `flashcards/${cardItem.ID}`;

      result = await fetchRequest(endpoint);
      if (!result.success) {
        throw new Error(result.message);
      }
      
    } catch (error) {
      console.error(error);
      navigation.goBack();
    } finally {
      if (result.success) {
        // Set the card info to dislpay it.
        const newCardInfo = {
          question: result.message[0]?.question, 
          answer: result.message[0]?.answer,
          ID: result.message[0]?.ID,
        };
        setCardInfo(newCardInfo);
      }
    }
  };

  // Effect to fetch(refetch) the card data when it's needed.
    useEffect(() => {
      // If we come to this screen from the flashcard list screen, we already have the card data.
      // If we come from the flash card detail or go to the next or prev card, we need to fetch the card data.
      if (cameFromScreen === "FlashCardDetailsScreen") {
        setReload(true);
      }
      if (reload) {
        console.log("reload");
        fetchCardData()
        setReload(false);
      }
    }, [reload, cameFromScreen]);

    // Event to set the current id in Ids array to switch between cards by clicking on the buttons in the bottom of the screen.
    useEffect(() => {
      if (!cardItem){
          navigation.goBack();
      }
      if(cameFromScreen === "FlashCardListScreen"){
        const idToCheck = cardItem.ID ?? cardItem.flashcardID; // Use flashcardID if ID is undefined
        if (idToCheck === undefined) {
          console.error("Both cardItem.ID and cardItem.flashcardID are undefined.");
          return;
        }
        console.log(idToCheck);
        let temp = cardIds.findIndex((id) => id === idToCheck);
        setCurrentIndex(temp);
      }
      // Set card info to display for the case when we come to this screen from the flashcard list screen.
      setCardInfo({ question: cardItem.question, answer: cardItem.answer, ID: cardItem.ID});

    }, [cardItem]);
  

    /**
     * @brief Function to show a popup message
     * 
     * @param {string} message - The message to show
     */
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

    /**
     * @brief Function to get the color of the option based on the score
     * 
     * @param {number} score - The score of the attempt
     * 
     * @returns {string} - The color of the option to be displayed
     */
    const getOptionColor = (score) => {
      if (score === 3) {
          return '#E66565'; 
      } else if (score === 5) {
          return '#6584E9'; 
      } else if (score === 7) {
          return '#66E978'; 
      }
      return '#ffff'; 
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.topBarContainer}>
          {/* Top bar with the titile and buttons to edit if the user is the creator of the card. */}
            <TouchableOpacity onPress={() => navigation.goBack("FlashCardListScreen")}>
                <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.textStyle}>Flash Card</Text>
            {isCreator ? (
                  <TouchableOpacity onPress={() => navigation.navigate("EditFlashCardFormScreen", { flashCardItem: cardInfo, setReloadPrevScreen: setReload})}>
                      <Icon name="create-outline" size={38} color="black" />
                  </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="heart-outline" size={38} color="transparent" />
                </TouchableOpacity>
            )}
        </View>

        <View style={styles.flashCardContainer}>
            <TouchableWithoutFeedback onPress={handlePressToTurnSide}>
                <View>
                    <Animated.View style={[styles.flashCard, styles.frontCard, frontAnimatedStyle]}>              
                        <Text style={styles.textStyle2}>{cardInfo.question}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.flashCard, styles.backCard, backAnimatedStyle]}>
                        <Text style={styles.textStyle2}>{cardInfo.answer}</Text>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>

          {/* If the card side is answer, show the score options to rate the user's knowledge */}
        {cardSide === 'answer' && (
        <View style={styles.scoreOptionsContainer}>
        <Text style={styles.scoreOptionsTitleText}>How well did you know this?</Text>
        <View style={styles.scoreOptionsWrapper}>
            {['Bad', 'So so', 'Good'].map((option, index) => {
                const score = index === 0 ? 3 : index === 1 ? 5 : 7; // Different scores that indicates: Bas, So so, Good
                const backgroundColor = getOptionColor(score); // Get the color based on the score
    
                return (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleOptionPress(score, option)}
                        style={[
                            styles.singleScoreOptionWrapper,
                            selectedOption === option && styles.selectedOption,
                            selectedOption && selectedOption !== option && styles.disabledOption,
                            { backgroundColor }, // Apply the dynamic background color here
                        ]}
                        disabled={!!selectedOption} // Block the button if an option is already selected
                    >
                        <Animated.Text
                            style={[
                                styles.scoreOptionText,
                                selectedOption === option && { transform: [{ scale: textSizeAnim }] },
                            ]}
                        >
                            {option}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
    )}

        {popupMessage && (
            <Animated.View style={[styles.popupContainer, { opacity: fadeAnim }]}>
                <Text style={styles.popupText}>{popupMessage}</Text>
            </Animated.View>
        )}

    {/* Buttons to navigate between cards to switch between cards directly from this screen. */}
    <View style={styles.cardNavButtonContainer}> 
      {currentIndex !== 0 && (
        <TouchableOpacity
          style={styles.cardNavButton}
          onPress={() => {
            if (flipped) {
              setCardSide('question');
              flipToFront();
            }
              setSelectedOption(null);
              // Find the next card in the list by array from the flashcard list screen.
              cardItem.ID = cardIds[currentIndex - 1];
              setCurrentIndex(currentIndex - 1);
              setReload(true);
          }}
        >
          <Text style={styles.cardNavButtonText}>{'<'}</Text>
        </TouchableOpacity>
      )}

      {cardIds.length > 0 && cardIds.length - 1 !== currentIndex && (

        <TouchableOpacity
          style={styles.cardNavButton}
          onPress={() => {
            if (flipped) {
              setCardSide('question');
              flipToFront();
            }
              setSelectedOption(null);
               // Find the next card in the list by array from the flashcard list screen.
              cardItem.ID = cardIds[currentIndex + 1];
              setCurrentIndex(currentIndex + 1);
              setReload(true);
          }}
        >
          <Text style={styles.cardNavButtonText}>{'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
    </SafeAreaView>
  )
}

export default FlashCardDetailsScreen