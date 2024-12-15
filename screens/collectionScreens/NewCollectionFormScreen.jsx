/**
 * File: NewCollectionFormScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { Text, TextInput, View, TouchableOpacity, Alert,} from 'react-native'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import styles from './newCollectionFormScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { postRequest } from '../../api'
import config from '../../config/config'

const NewCollectionFormScreen = () => {

    const { handleSubmit, register, setValue, error } = useForm();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Delay function to simulate loading

    const navigation = useNavigation(); 
    
    /**
     * @brief Function to handle form submission
     * 
     * @param {Object} formData 
     * 
     * @returns {void}
     */
    const onSubmit = useCallback(async (formData) => {
      console.log(formData);
      // Check if collection name is empty, it wil not be created
      if(formData.collectionName === '' || formData.collectionName === undefined){
        Alert.alert(
          'Creation Failed',
          'Collection name cannot be empty. Please try again.',
          [{ text: 'OK' }]
        );
        return;
      }
      if (formData.collectionName.length > 25){
        Alert.alert(
          'Creation Failed',
          'Collection name is too long. Please try again.',
          [{ text: 'OK' }]
        );
        return;
      }
      // Create new collection with the given name
      try{
        let endpoint = 'decks/create';
        let postData = {
            username: `${config.USERNAME}`,
            deckname: formData.collectionName,
        };
        let result = await postRequest(endpoint, postData);

        if(!result.success){
          console.log(result.success)
          throw new Error("Failed to create collection");
        }
      } catch (error) {
        console.error("ERROR" + error);
        Alert.alert(
          'Creation Failed',
          'There was an issue creating the collection. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        // Give the time to the server to create the collection
        await delay(100);
        navigation.navigate("CollectionListScreen", { title: "Your collections", propertyType: "created" });
      }
        
    }, []);

    // Function to set the value of the field in the form
    const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    });


  return (
    <SafeAreaView>
        {/* Top bar with back button */}
        <View style ={styles.topBarContainer}>
        <TouchableOpacity TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.titleStyle}>New Collection</Text>
            {/* Transparent button to keep the layout and spacing */}
            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="transparent" />
            </TouchableOpacity>
        </View>
        
        {/* Form to create a new collection */}
        <View style={[styles.formContainer, styles.spacing]}>
          <Text style={[styles.titleStyle2, styles.titleSpacing]}>Collection's name</Text>

            <TextInput 
              placeholder='Enter collection name' 
              style={styles.inputStyle}
              onChangeText={onChangeField('collectionName')}
              />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

        </View>


        
    </SafeAreaView>
  )
}

export default NewCollectionFormScreen