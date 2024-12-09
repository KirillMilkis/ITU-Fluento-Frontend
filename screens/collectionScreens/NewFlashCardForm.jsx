import { StyleSheet, Text, 
    TextInput, View, TouchableOpacity, 
    Alert,
    Button, ActivityIndicator, Animated} from 'react-native'
  import React, { useCallback } from 'react'
  import { set, useForm } from 'react-hook-form'
  import { ScrollView } from 'react-native-gesture-handler'
  import styles from './newFlashCardForm.styles'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import { FlashCardListTile } from '../../components'
  import { useNavigation } from '@react-navigation/native'
  import { usePostRequest } from '../../api'
  import Icon from 'react-native-vector-icons/Ionicons'
  import { useState, useEffect } from 'react'
  import { postRequest } from '../../api'

  
  const NewFlashCardForm = ({route}) => {

      const { deckId } = route.params;
  
      const { handleSubmit, register, setValue, error } = useForm();
  
      const navigation = useNavigation();
  
      const onChangeField = useCallback((name) => (text) => {
            setValue(name, text);
      });


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

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
        <TouchableOpacity TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.titleStyle}>New FlashCard</Text>

            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="transparent" />
            </TouchableOpacity>
        </View>


        <View style={[styles.formContainer, styles.spacing]}>
        <View style={styles.flashCardContainer}>
            <View style={styles.flashCardTop}>
                <Text style={[styles.textStyle, styles.titleSpacing]}>Question</Text>

                    <TextInput 
                    placeholder='Enter question' 
                    style={styles.inputStyle}
                    onChangeText={onChangeField('question')}
                    />
            </View>
            <View style={styles.flashCardBottom}>
                <Text style={[styles.textStyle, styles.titleSpacing]}>Answer</Text>

                    <TextInput 
                    placeholder='Enter answer' 
                    style={styles.inputStyle}
                    onChangeText={onChangeField('answer')}
                    />
            </View>
        </View>

            <TouchableOpacity style={[styles.submitButton, styles.spacing2]} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

        </View>
          
      </SafeAreaView>
    )
  }
  
  export default NewFlashCardForm