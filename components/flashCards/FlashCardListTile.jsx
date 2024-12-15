/**
 * File: FlashCardListTile.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './flashCardListTile.styles'
import { useNavigation } from '@react-navigation/native'

// cardItem - flashcard object
// isCreator - boolean if the user is the creator of the flashcard
// isAnswerHidden - boolean if the answer should be hidden
// cardIds - array of card ids to navigate between cards in the flashCardDetails screen
const FlashCardListTile = ({cardItem, isCreator, isAnswerHidden, cardIds}) => {

    const navigation = useNavigation()
    // If cardItem is not passed, nothing to render
    if (!cardItem){
        return null;
    }
    // Function to get the background color of the top card
    // In case when the flashcards sorted by attempts to solve them, the color will be different
    const getTopCardBackgroundColor = (score) => {
        if (score === undefined || score === null) {
            return styles.defaultTopCardBackgroundColor;
        } else if (score == 3) {
            return '#E66565'; // Light red for low scores
        } else if (score == 5) {
            return '#6584E9'; // Light blue for medium scores
        } else if (score == 7) {
            return '#66E978'; // Light green for high scores
        } else {
            return styles.defaultTopCardBackgroundColor;
        }
    };

    // Function to get the background color of the bottom card
    // In case when the flashcards sorted by attempts to solve them, the color will be different
    const getBottomCardBackgroundColor = (score) => {
        if (score === undefined || score === null) {
            return styles.defaultBottomCardBackgroundColor; 
        } else if (score == 3) {
            return '#C15555'; // Light red for low scores
        } else if (score == 5) {
            return '#5671C7'; // Light blue for medium scores
        } else if (score == 7) {
            return '#50BA5E'; // Light green for high scores
        } else {
            return styles.defaultBottomCardBackgroundColor;
        }
    };
    
    return (
        <TouchableOpacity 
            style={[styles.card]} 
            onPress={() => navigation.navigate('FlashCardDetailsScreen', { cardItem: cardItem, isCreator: isCreator, cameFromScreen: 'FlashCardListScreen', cardIds: cardIds })}>
                   {/* Flash card tile */}
            <View style={styles.flashCard}>
                <View style={[styles.flashCardTop, { backgroundColor: getTopCardBackgroundColor(cardItem.latestScore)} ]}>
                    <Text style={styles.flashCardText}>{cardItem.question}</Text>
                </View>
                <View style={[styles.flashCardBottom, { backgroundColor: getBottomCardBackgroundColor(cardItem.latestScore) }]}>
                <Text style={styles.flashCardText}>
                    {/* If adjusted to not show answers, it will be hidden by *: */}
                    {isAnswerHidden ? "**********" : cardItem.answer}
                </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FlashCardListTile