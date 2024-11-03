import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import * as Font from 'expo-font';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlashCards, CollectionsList, FlashCardDetails } from './screens';

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

          <Stack.Screen name="FlashCards"
          component={FlashCards}
          options={{headerShown: false}}
          />

          <Stack.Screen name="CollectionsList"
          component={CollectionsList}
          options={{headerShown: false}}
          />

          <Stack.Screen name="FlashCardDetails"
          component={FlashCardDetails}
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


