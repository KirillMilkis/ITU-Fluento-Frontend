import { StyleSheet, Text, 
  TextInput, View, TouchableOpacity, 
  Alert,
  Button} from 'react-native'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './newCollectionForm.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardListTile } from '../../components'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createCollection } from '../../Api'

const NewCollectionForm = () => {

    // type FormData = {
    //     collectionName: string
    // }
    //   // collectionDescription: string,
    //     // collectionTags: string

    const { handleSubmit, register, setValue, error} = useForm();

    const onSubmit = useCallback((data) => {
      Alert.alert('Form Data', JSON.stringify(data));
      try {
        const result = createCollection(data);
      } catch (error) {
        console.error(error);
      } 
      if (result) {
        navigation.goBack();
      }
    });

    const onChangeField = useCallback((name) => (text) => {
      setValue(name, text);
    })

    const navigation = useNavigation();
    


  return (
    <SafeAreaView>
        <View style ={styles.topBarContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
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