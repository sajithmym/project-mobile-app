// src/screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, STRINGS, LINKS } from '../constants/settings';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sajithmym</Text>
      <Text style={styles.subHeading}>University of Kelaniya</Text>
      <View style={styles.linkContainer}>
        <Icon name="globe" size={20} color={COLORS.primary} />
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(LINKS.portfolio)}>
          Portfolio
        </Text>
      </View>
      <View style={styles.linkContainer}>
        <Icon name="github" size={20} color="#000" />
        <Text style={styles.link} onPress={() => Linking.openURL(LINKS.github)}>
          GitHub
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS.secondary,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
});

export default DetailsScreen;
