/**
 * File: EditFlashCardFormScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 09.12.2024
 * 
 */
import { Text, View, TouchableOpacity, Alert,} from 'react-native'
import React, { useCallback } from 'react'
import styles from './flashCardFormScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardForm } from '../../components'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { postRequest } from '../../api'


  
const EditFlashCardFormScreen = ({route}) => {

    const navigation = useNavigation();
    const { flashCardItem, setReloadPrevScreen} = route.params;

    /**
     * @brief Function to send a POST request to the server to update the flash card
     * 
     * @param {Object} formData - The data from editable form to send to the server
     * 
     * @returns {void}
     */
    const onSubmit = useCallback(async(formData) => {
        let result1, result2;

        // Question and answer validation
        if(formData.question === "" || formData.answer === ""){
            Alert.alert(
                'Creation Failed',
                'Please fill in all the fields',
                [{ text: 'OK' }]
                );
            return;
        }
        if(formData.question === flashCardItem.question && formData.answer === flashCardItem.answer){
            navigation.goBack();
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

            // Two Post requests because BE has two different endpoints for updating question and answer
            let endpoint = `flashcards/${flashCardItem.ID}/updateQuestion`;
            let postData = {
                newQuestion: formData.question,
            };
            result1 = await postRequest(endpoint, postData);

            endpoint = `flashcards/${flashCardItem.ID}/updateAnswer`;
            postData = {
                newAnswer: formData.answer,
            };
            result2 = await postRequest(endpoint, postData);

            if(!result1.success || !result2.success){
                console.log(result.success)
                throw new Error("Failed to create flash card");
                }
        } catch (error) {
            console.error("ERROR" + error);
            Alert.alert(
                'Creation Failed',
                'There was an issue editing the flash card. Please try again.',
                [{ text: 'OK' }]
                );
            return;
        } finally {
            await new Promise(resolve => setTimeout(resolve, 500));
            // Reload the previous screen to show the updated data, setReloadPrevScreen is a useState from the FlashCardDetailScreen
            setReloadPrevScreen(true);
            navigation.goBack();
        }
    }, []);

    /**
     * @brief Function to ask for confirmation before deleting the flash card
     * 
     * @returns {void}
     */
    const askForDelete = async () => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                text: "Cancel",
                style: "cancel"
                },
                {
                text: "Delete",
                onPress: () => handleDelete(),
                style: "destructive"
                }
            ]
            );
        
    };

    /**
     * @brief Function to send a POST request to the server to delete the flash card
     * 
     * @returns {void}
     */
    const handleDelete = async () => {
        try {
            const endpoint = `flashcards/${flashCardItem.ID}/delete`;
            const postData = {};
            const result = await postRequest(endpoint, postData);
            if (result.success) {
                navigation.goBack();
            } else {
                showPopup(result.message);
            }
        } catch (error) {
            console.log(error.message);
            Alert.alert(
                'Delete Failed',
                'There was an issue deliting the flash card. Please try again.',
                [{ text: 'OK' }]
                );
        } finally {
            navigation.pop(1);
        }
    };



    return (
        <SafeAreaView>
            {/* Here only the top bar, form is in the components */}
            <View style ={styles.topBarContainer}>
            <TouchableOpacity TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={38} color="black" />
                </TouchableOpacity>

                <Text style={styles.titleStyle}>Edit FlashCard</Text>

                <TouchableOpacity onPress={askForDelete}>
                        <Icon name="trash-outline" size={38} color="red" />
                </TouchableOpacity>
            </View>
            <FlashCardForm exists={true} flashCardItem={flashCardItem} submitFunc={onSubmit}></FlashCardForm>
        </SafeAreaView>
    )
}


export default EditFlashCardFormScreen