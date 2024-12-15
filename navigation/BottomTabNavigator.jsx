import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Decks, Stats } from '../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/theme'
import CollectionsMain from '../screens/collectionScreens/CollectionsMainScreen';
import AllQuizzesScreen from '../screens/quizScreens/AllQuizzesScreen';
import StatisticScreen from '../screens/statisticScreens/StatisticScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 80,
        backgroundColor: COLORS.tabPrimary,
    }
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" 
        component={AllQuizzesScreen} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Icon name={"home"} size={24} color={focused ? COLORS.tabSecondary : COLORS.white }/>
        }}}
        />
        <Tab.Screen name="Collections" 
        component={CollectionsMain} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Icon name={"bookmark"} size={24} color={focused ?  COLORS.tabSecondary : COLORS.white }/>
        }}}
        />
        <Tab.Screen name="Stats" 
        component={StatisticScreen} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Icon name={"stats-chart"} size={24} color={focused ? COLORS.tabSecondary : COLORS.white }/>
        }}}
        />
        
    </Tab.Navigator>
  )
}

export default BottomTabNavigator