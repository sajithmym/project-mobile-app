// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS, STRINGS } from '../constants/settings';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {STRINGS.appName}!</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate(STRINGS.devInfo)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: COLORS.text,
  },
});

export default HomeScreen;