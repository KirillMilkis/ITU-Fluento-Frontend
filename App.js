import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import * as Font from 'expo-font';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlashCardsListScreen, FlashCardDetailsScreen, NewCollectionFormScreen, CollectionListScreen, NewFlashCardFormScreen, EditFlashCardFormScreen, ResultsScreen } from './screens';
import { AllQuizzesScreen, LevelQuizzesScreen, GrammarScreen, MultipleChoiceScreen, TrueFalseScreen} from './screens';
import { UserProfileScreen, UserSettingsScreen, AvatarChangeScreen } from './screens';
import { StatisticScreen, LeaderboardScreen } from './screens';

// Temporary addition that removes logs appearing on the screen
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

          <Stack.Screen name="FlashCardDetailsScreen"
          component={FlashCardDetailsScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewCollectionFormScreen"
          component={NewCollectionFormScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="NewFlashCardFormScreen"
          component={NewFlashCardFormScreen}
          options={{headerShown: false}}
          />

          <Stack.Screen name="EditFlashCardFormScreen"
          component={EditFlashCardFormScreen}
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


