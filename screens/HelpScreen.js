// src/screens/HelpScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, STRINGS } from '../constants/settings';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Screen</Text>
      <Text style={styles.text}>This is the help screen.</Text>
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
  text: {
    fontSize: 16,
    color: COLORS.secondary,
  },
});

export default HelpScreen;