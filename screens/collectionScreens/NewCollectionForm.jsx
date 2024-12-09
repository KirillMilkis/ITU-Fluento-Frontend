import { StyleSheet, Text, 
  TextInput, View, TouchableOpacity, 
  Alert,
  Button} from 'react-native'
import React, { useCallback } from 'react'
import { set, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './newCollectionForm.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardListTile } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { usePostRequest } from '../../api'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react'
import { postRequest } from '../../api'

const NewFlashCardForm = () => {

    const { handleSubmit, register, setValue, error } = useForm();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const navigation = useNavigation();
    const [triggerPost, setTriggerPost] = useState(false);

    const onSubmit = useCallback(async (formData) => {
      try{
        let endpoint = 'decks/create';
        let postData = {
            username: 'Alice',
            deckname: formData.collectionName,
        };
        let result = postRequest(endpoint, postData);
        console.log(result.message);

      } catch (error) {
        console.error("ERROR" + error);
        Alert.alert(
          'Creation Failed',
          'There was an issue creating the collection. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        await delay(100);
        navigation.navigate("CollectionListScreen", { title: "Your collections", propertyType: "created" });
      }
        
    }, []);

    const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    });


  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
        <TouchableOpacity TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>

            <Text style={styles.titleStyle}>New Collection</Text>

            <TouchableOpacity onPress={()=>{}}>
            <Icon name="heart-outline" size={38} color="transparent" />
            </TouchableOpacity>
        </View>
        
        
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

export default NewFlashCardForm