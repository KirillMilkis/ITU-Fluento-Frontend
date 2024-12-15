import { Text, View, TouchableOpacity, Alert,} from 'react-native'
  import React, { useCallback } from 'react'
  import styles from './flashCardFormScreen.styles'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import { FlashCardForm } from '../../components'
  import { useNavigation } from '@react-navigation/native'
  import Icon from 'react-native-vector-icons/Ionicons'
  import { postRequest } from '../../api'

  
  const NewFlashCardForm = ({route}) => {


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
        try{
            let endpoint = 'flashcards/create';
            let postData = {
                username: 'Alice',
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