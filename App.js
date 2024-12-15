import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import * as Font from 'expo-font';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CreateGrammarScreen, NewQuestionScreen, NewQuizScreen, CreateFillInScreen, CreateMatchPairsScreen, CreateMultipleChoiceScreen, CreateOrderingScreen, CreateTrueFalseScreen } from './screens';
import { FlashCardsListScreen, FlashCardDetails, NewCollectionForm, CollectionListScreen, NewFlashCardForm, ResultsScreen } from './screens';
import { AllQuizzesScreen, LevelQuizzesScreen, GrammarScreen, MultipleChoiceScreen, TrueFalseScreen} from './screens';
import { UserProfileScreen, UserSettingsScreen, AvatarChangeScreen, UserQuizzesScreen} from './screens';
import { StatisticScreen, LeaderboardScreen } from './screens';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       Ionicons: Ionicons.font,
  //     });
  //     setFontsLoaded(true);
  //   }
  //   loadFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   return null; // or a loading spinner
  // }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Bottom Navigation" 
          component={BottomTabNavigator} 
          options={{headerShown: false}}
          />

          <Stack.Screen name="FlashCardsListScreen"
          component={FlashCardsListScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CollectionListScreen"
          component={CollectionListScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="FlashCardDetails"
          component={FlashCardDetails}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewCollectionForm"
          component={NewCollectionForm}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewFlashCardForm"
          component={NewFlashCardForm}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateGrammarScreen"
          component={CreateGrammarScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewQuestionScreen"
          component={NewQuestionScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewQuizScreen"
          component={NewQuizScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateFillInScreen"
          component={CreateFillInScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateMatchPairsScreen"
          component={CreateMatchPairsScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateMultipleChoiceScreen"
          component={CreateMultipleChoiceScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateOrderingScreen"
          component={CreateOrderingScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CreateTrueFalseScreen"
          component={CreateTrueFalseScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="AllQuizzesScreen"
          component={AllQuizzesScreen}
          options={{headerShown: false}}
          />


          <Stack.Screen name="LevelQuizzesScreen"
          component={LevelQuizzesScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="UserProfileScreen"
          component={UserProfileScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="UserSettingsScreen"
          component={UserSettingsScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="AvatarChangeScreen"
          component={AvatarChangeScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="UserQuizzesScreen"
          component={UserQuizzesScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="StatisticScreen"
          component={StatisticScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="LeaderboardScreen"
          component={LeaderboardScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="GrammarScreen"
          component={GrammarScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="MultipleChoiceScreen"
          component={MultipleChoiceScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="TrueFalseScreen"
          component={TrueFalseScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="ResultsScreen"
          component={ResultsScreen}
          options={{headerShown: false}}
          />

        </Stack.Navigator>


      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


