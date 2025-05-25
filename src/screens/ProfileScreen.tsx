import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserDetails, updateUserDetails } from '../services/authService';
import { colors } from '../constants/colors';
import { texts } from '../constants/texts';

const ProfileScreen = () => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = await getUserDetails();
            setUserDetails(details);
            setLoading(false);
        };
        fetchUserDetails();
    }, []);

    const handleUpdate = async () => {
        await updateUserDetails(userDetails);
        setEditable(false);
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <Text>{texts.loading}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{texts.profile}</Text>
            <TextInput
                style={styles.input}
                value={userDetails.name}
                onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
                editable={editable}
                placeholder={texts.name}
            />
            <TextInput
                style={styles.input}
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
                editable={editable}
                placeholder={texts.email}
            />
            <View style={styles.buttonContainer}>
                {editable ? (
                    <Button title={texts.save} onPress={handleUpdate} />
                ) : (
                    <Button title={texts.edit} onPress={() => setEditable(true)} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: colors.border,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;