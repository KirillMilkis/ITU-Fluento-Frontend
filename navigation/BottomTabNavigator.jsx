import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Decks, Stats } from '../screens'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/theme'

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
    }
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" 
        component={Home} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Ionicons name={focused ? "home" : "home-outline" } size={24} color={focused ? COLORS.tabPrimary : COLORS.tabSecondary}/>
        }}}
        />
        <Tab.Screen name="Decks" 
        component={Decks} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Ionicons name={focused ? "bookmark" : "bookmark-outline" } size={24} color={focused ? COLORS.tabPrimary : COLORS.tabSecondary}/>
        }}}
        />
        <Tab.Screen name="Stats" 
        component={Stats} 
        options= {{
            tabBarIcon : ({focused}) => {
                return <Ionicons name={focused ? "stats-chart" : "stats-chart-outline" } size={24} color={focused ? COLORS.tabPrimary : COLORS.tabSecondary}/>
        }}}
        />
        
    </Tab.Navigator>
  )
}

export default BottomTabNavigator