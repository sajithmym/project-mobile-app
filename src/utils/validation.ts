import { Alert } from 'react-native';

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateForm = (email: string, password: string): boolean => {
    if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return false;
    }
    if (!validatePassword(password)) {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
        return false;
    }
    return true;
};