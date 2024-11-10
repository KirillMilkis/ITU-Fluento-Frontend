import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import styles from './grammar.styles';
import { getGrammar} from '../../api';
import { TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const GrammarScreen = ({navigation}) => {
    const route = useRoute();
    const { quizID, quizTitle } = route.params;

    const [grammar, setGrammar] = useState([]);

    const fetchGrammar = async () => {
        try {
            const result = await getGrammar(quizID);;
            setGrammar(result);
        } catch (error) {
            console.error("Failed to fetch grammar:", error);
        }
    };

    useEffect(() => {
        fetchGrammar();
    }, []);

    return (
        <SafeAreaView>
            <View style={[styles.topBarContainer]}>
                <Text style={[styles.topBarText]}>{quizTitle}</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="close-circle-outline" style={[styles.topBarIcon]}></Ionicons>
                </TouchableOpacity>
            </View >
            <Text style={[styles.titleStyle]}>{grammar.name}</Text>
            <Text style={[styles.textStyle]}>{grammar.description}</Text>
        </SafeAreaView>
    );
};

export default GrammarScreen;