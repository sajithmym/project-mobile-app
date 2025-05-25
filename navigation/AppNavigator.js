// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import { COLORS, STRINGS } from '../constants/settings';

// Create Tab and Drawer Navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Main Tabs Component
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === STRINGS.home) {
            iconName = 'home';
          } else if (route.name === STRINGS.devInfo) {
            iconName = 'user';
          } else if (route.name === STRINGS.help) {
            iconName = 'question-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Hide header for all tabs
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.secondary,
      }}
    >
      <Tab.Screen name={STRINGS.home} component={HomeScreen} />
      <Tab.Screen name={STRINGS.devInfo} component={DetailsScreen} />
      <Tab.Screen name={STRINGS.help} component={HelpScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigator Component
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name={STRINGS.home} component={MainTabs} />
        <Drawer.Screen name={STRINGS.settings} component={SettingsScreen} />
        <Drawer.Screen name={STRINGS.signIn} component={SignInScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;