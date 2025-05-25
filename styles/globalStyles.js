// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/settings';

export const globalStyles = StyleSheet.create({
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