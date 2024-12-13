import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './grammar.styles';
import { TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import startQuiz from '../../api/startQuiz';



import config from '../../config/config';

const GrammarScreen = ({navigation}) => {
    const route = useRoute();
    const {quizID, quizTitle } = route.params;

    const [grammar, setGrammar] = useState([]);
    const [question, setQuestion] = useState([]);

    const fetchGrammar = async () => {
        try {
            const result = await startQuiz(quizID);;
            setGrammar(result);
        } catch (error) {
            console.error("Failed to fetch grammar:", error);
        }
    };


    useEffect(() => {
        fetchGrammar();
    }, []);

    const nextQuestion = () => {
        navigation.navigate('QuestionScreen')
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.topBarContainer]}>
                <Text style={[styles.topBarText]}>{quizTitle}</Text>
                <TouchableOpacity onPress={()=>navigation.popToTop()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View >
            <Text style={[styles.titleStyle]}>{grammar.name}</Text>
            <Text style={[styles.textStyle]}>{grammar.description}</Text>
            <Image
                        source={{
                            uri: `${config.IMAGE_URL}${grammar.photo}`,
                        }}
                        style={styles.image}
                        />
            <View style={[styles.bottomBarContainer]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>nextQuestion()}>
                    <Ionicons name="arrow-forward" style={[styles.bottomBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default GrammarScreen;