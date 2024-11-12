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

  
  const NewFlashCardForm = ({route}) => {

      const { deckId } = route.params;
  
      const { handleSubmit, register, setValue, error } = useForm();
  
      const navigation = useNavigation();
      const [postData, setPostData] = useState(null);
      const [triggerPost1, setTriggerPost1] = useState(false);
      const [triggerPost2, setTriggerPost2] = useState(false);
      const [endpoint, setEndpoint] = useState('');

      const { result: result1, error: postError1 } = usePostRequest(endpoint, triggerPost1 ? postData : null);
      const { result: result2, error: postError2 } = usePostRequest(endpoint, triggerPost2 ? postData : null);

  
      const onChangeField = useCallback((name) => (text) => {
            setValue(name, text);
      });


      const onSubmit = useCallback((formData) => {
        setEndpoint('flashcards/create');
        setPostData({
            username: 'Alice',
            question: formData.question,
            answer: formData.answer
        });
        console.log(postData);
        setTriggerPost1(true);
        }, []);

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        useEffect(() => {
            const handleSecondRequest = async () => {
                await delay(1000); // Add a delay of 1 second
                setEndpoint(`flashcards/${result1.data.id}/addToDeck`);
                setPostData({
                    deckID: deckId,
                });
                setTriggerPost2(true);
            };
    
            if (result1 && result1.success) {
                setTriggerPost1(false);
                handleSecondRequest();
            }
        }, [result1, result1.success]);


        useEffect(() => {
            if (result2 && result2.success) {
                setTriggerPost2(false);
                navigation.goBack("FlashCardListScreen", { refresh: true });
            }
        }, [result2, result2.success]);

        useEffect(() => {
            if (postError1) {
                console.error(postError1);
                setTriggerPost1(false);
            }
        }, [postError1]);
    
        useEffect(() => {
            if (postError2) {
                console.error(postError2);
                setTriggerPost2(false);
            }
        }, [postError2]);
      
  
  
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