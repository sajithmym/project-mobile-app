import React from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions';
import { colors } from '../constants/colors';
import { settings } from '../constants/settings';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const [isEnabled, setIsEnabled] = React.useState(isDarkMode);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        // Dispatch action to change theme
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{settings.title}</Text>
            <View style={styles.settingItem}>
                <Text style={styles.label}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: colors.lightGray, true: colors.darkGray }}
                    thumbColor={isEnabled ? colors.white : colors.black}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Button title="Logout" onPress={handleLogout} color={colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
    },
});

export default SettingsScreen;