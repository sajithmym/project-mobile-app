import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { colors } from '../constants/colors';

const ActionsScreen = () => {
    const { colors: themeColors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <Text style={[styles.title, { color: themeColors.text }]}>Actions</Text>
            <Text style={[styles.description, { color: themeColors.text }]}>
                Here you can perform various actions related to your account.
            </Text>
            {/* Additional action components can be added here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 8,
    },
});

export default ActionsScreen;