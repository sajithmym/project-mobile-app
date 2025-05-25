import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/authService';
import colors from '../constants/colors';
import texts from '../constants/texts';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await signUp(email, password);
            Alert.alert(texts.signupSuccess);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(texts.signupError, error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{texts.signUp}</Text>
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
            <Button title={loading ? texts.loading : texts.signUp} onPress={handleSignUp} disabled={loading} />
            <Button title={texts.goToLogin} onPress={() => navigation.navigate('Login')} />
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

export default SignUpScreen;