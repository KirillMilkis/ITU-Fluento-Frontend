import { Text, View, TouchableOpacity, Alert,} from 'react-native'
import React, { useCallback } from 'react'
import styles from './flashCardFormScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardForm } from '../../components'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { postRequest } from '../../api'
import config from '../../config/config'

  
const NewFlashCardForm = ({route}) => {

    // deckId - the deck that the flashcard will be added to
    const { deckId } = route.params;
    const navigation = useNavigation();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 

    /**
     * @brief Function to handle the submit of the form to create a flashcard
     * 
     * @param {Object} formData
     * 
     * @returns {void}
     */
    const onSubmit = useCallback(async(formData) => {
        let result;

          // Data validation
          if(formData.question === "" || formData.answer === ""){
            Alert.alert(
                'Creation Failed',
                'Please fill in all the fields',
                [{ text: 'OK' }]
                );
            return;
        }
        if(formData.question.length > 200 || formData.answer.length > 200){
            Alert.alert(
                'Creation Failed',
                'Question and answer must be less than 200 characters',
                [{ text: 'OK' }]
                );
            return;
        }

        try{
            let endpoint = 'flashcards/create';
            let postData = {
                username: `${config.USERNAME}`,
                question: formData.question,
                answer: formData.answer
            };

            result = await postRequest(endpoint, postData);
            if(!result.success){
                console.log(result.success)
                throw new Error("Failed to create flash card");
                }
        } catch (error) {
            console.error("ERROR" + error);
            Alert.alert(
                'Creation Failed',
                'There was an issue creating the flash card. Please try again.',
                [{ text: 'OK' }]
                );
            return;
        } finally {
            handleSecondRequest(result); // Pass the result to the second request

        }
    }, []);

  
    /**
     * @brief Function to handle the second request to add the card to the specific deck
     * 
     * @param {Object} result1
     * 
     * @returns {void} 
     */
    const handleSecondRequest = async (result1) => {
        try{
            await delay(500); // Add a delay of 1 second
            let endpoint = `flashcards/${result1.message.id}/addToDeck`;
            let postData = {
                deckID: deckId,
            };
            
            let result = await postRequest(endpoint, postData);
            if(!result.success){
                console.log(result.success)
                throw new Error("Failed to add a card to collection");
                }
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Creation Failed',
                'There was an issue creating the flash card. Please try again.',
                [{ text: 'OK' }]
                );
        } finally {
            navigation.goBack("FlashCardListScreen", { refresh: true });
        }
    }; 

    return (
        <SafeAreaView>
            <View style ={styles.topBarContainer}>
                {/* Here only the top bar, form is in the components */}
            <TouchableOpacity TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>

                <Text style={styles.titleStyle}>New FlashCard</Text>

                <TouchableOpacity onPress={()=>{}}>
                <Icon name="heart-outline" size={38} color="transparent" />
                </TouchableOpacity>
            </View>
            <FlashCardForm exists={false} submitFunc={onSubmit}></FlashCardForm>
        </SafeAreaView>
    )
  }
  
export default NewFlashCardForm