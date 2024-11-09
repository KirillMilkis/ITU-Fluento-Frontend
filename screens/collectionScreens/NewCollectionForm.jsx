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

const NewCollectionForm = () => {

    const { handleSubmit, register, setValue, error } = useForm();

    const navigation = useNavigation();
    const [postData, setPostData] = useState(null);
    const [triggerPost, setTriggerPost] = useState(false);

    const endpoint = 'decks/create';
    const { result, error: postError } = usePostRequest(endpoint, triggerPost ? postData : null);

    const onSubmit = useCallback((formData) => {
        setPostData({
            username: 'Alice',
            deckname: formData.collectionName,
        });
        setTriggerPost(true);
    }, []);

    const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    });

    useEffect(() => {
        if (result) {
          navigation.navigate("CollectionListScreen", { title: "Your collections", type: "created" });
          setTriggerPost(false);
        }
    }, [result, navigation]);

    useEffect(() => {
        if (postError) {
            console.error(postError);
            setTriggerPost(false);
        }
    }, [postError]);
    


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

export default NewCollectionForm