import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/authService';
import colors from '../constants/colors';
import texts from '../constants/texts';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(texts.error, error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{texts.login}</Text>
            <TextInput
                style={styles.input}
                placeholder={texts.email}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={texts.password}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={loading ? texts.loading : texts.login} onPress={handleLogin} disabled={loading} />
            <Button title={texts.signUp} onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: colors.primary,
    },
    input: {
        height: 40,
        borderColor: colors.border,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default LoginScreen;