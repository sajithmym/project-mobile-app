import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext for managing theme

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Text>
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    label: {
        fontSize: 16,
    },
});

export default ThemeToggle;