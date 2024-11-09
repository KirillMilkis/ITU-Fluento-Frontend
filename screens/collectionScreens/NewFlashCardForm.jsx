import { StyleSheet, Text, 
    TextInput, View, TouchableOpacity, 
    Alert,
    Button} from 'react-native'
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
  
  const NewFlashCardForm = ({route}) => {

      const { deckId } = route.params;
  
      const { handleSubmit, register, setValue, error } = useForm();
  
      const navigation = useNavigation();
      const [postData, setPostData] = useState(null);
  
    //   const onSubmit = useCallback((formData) => {
    //       setPostData({
    //           username: 'Alice',
    //           question: formData.question,
    //           answer: formData.answer
    //       });
    //       setTriggerPost(true);
    //   }, []);
  
      const onChangeField = useCallback((name) => (text) => {
          setPostData(name, text);
      });
  

      const handleSave = async (postData) => {
        const endpoint1 = 'flashcards/create';
        const endpoint2 = 'flashcards/update';
        try {
            setPostData({
                username: 'Alice',
                question: postData.question,
                answer: postData.answer
            });
            const result1 = await usePostRequest(endpoint1, postData);
            console.log(`RESULT IS ${result1}`);
            if (result1.success) {
                setPostData({ 
                    deckId: deckId,
                    flashcardId: result1.id 
                });
                const result2 = await usePostRequest(endpoint2, postData);
                console.log(`RESULT2 IS ${result2}`);
                if(result2.success){
                    navigation.goBack();
                }
            } else {
                showPopup(result1.message);
            }
        } catch (error) {
            showPopup(error.message || 'An unexpected error occurred');
        }
    }
      
  
  
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

            <TouchableOpacity style={[styles.submitButton, styles.spacing2]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

        </View>
        

       
  
  
          
      </SafeAreaView>
    )
  }
  
  export default NewFlashCardForm