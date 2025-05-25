import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Screen from '@/components/layout/Screen';
import Button from '@/components/ui/Button';
import { typography, spacing, strings, shadows, borderRadius } from '@/constants';
import { Camera, CreditCard as Edit, Calendar, Bell, CircleCheck as CheckCircle } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('Product Designer based in San Francisco');
  const [isSaving, setIsSaving] = useState(false);
  
  // Animation values
  const editScale = useSharedValue(1);
  const fadeAnim = useSharedValue(0);
  
  // Handle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Save profile changes
      Alert.alert(
        'Save Changes',
        'Are you sure you want to save these changes?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: saveChanges,
          },
        ]
      );
    } else {
      setIsEditing(true);
      fadeAnim.value = withTiming(1, { duration: 300 });
    }
  };
  
  // Save profile changes
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, update the user profile in Firebase
      // await updateUserProfile(name);
      
      setIsEditing(false);
      fadeAnim.value = withTiming(0, { duration: 300 });
      
      // Show success message
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Animation for edit button
  const animatedEditButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: editScale.value }],
      backgroundColor: isEditing ? colors.accent[500] : colors.primary[500],
    };
  });
  
  // Animation for edit container
  const animatedEditContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ translateY: interpolate(fadeAnim.value, [0, 1], [20, 0]) }],
    };
  });
  
  // Handle button press animation
  const handlePressIn = () => {
    editScale.value = withSpring(0.95);
  };
  
  const handlePressOut = () => {
    editScale.value = withSpring(1);
  };
  
  return (
    <Screen style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {strings.app.profile.title}
        </Text>
        
        <Animated.View
          style={[
            styles.editButton,
            animatedEditButtonStyle,
          ]}
        >
          <TouchableOpacity
            onPress={toggleEditMode}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.editButtonTouchable}
          >
            {isEditing ? (
              <CheckCircle size={20} color="#FFFFFF" />
            ) : (
              <Edit size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(200).duration(500)}
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.card,
            ...shadows.md,
          },
        ]}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  styles.profileImagePlaceholder,
                  { backgroundColor: colors.primary[100] },
                ]}
              >
                <Text
                  style={[
                    styles.profileImagePlaceholderText,
                    { color: colors.primary[600] },
                  ]}
                >
                  {name.charAt(0) || 'U'}
                </Text>
              </View>
            )}
            
            {isEditing && (
              <TouchableOpacity
                style={[
                  styles.cameraButton,
                  { backgroundColor: colors.primary[500] },
                ]}
              >
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            {isEditing ? (
              <TextInput
                value={name}
                onChangeText={setName}
                style={[
                  styles.nameInput,
                  { 
                    color: colors.text,
                    borderBottomColor: colors.border,
                  },
                ]}
                placeholder="Your Name"
                placeholderTextColor={colors.textSecondary}
              />
            ) : (
              <Text style={[styles.profileName, { color: colors.text }]}>
                {name || 'User'}
              </Text>
            )}
            
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        {isEditing ? (
          <Animated.View 
            style={[styles.bioEditContainer, animatedEditContainerStyle]}
          >
            <Text style={[styles.bioLabel, { color: colors.textSecondary }]}>
              {strings.app.profile.bio}
            </Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[
                styles.bioInput,
                { 
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
              multiline
              numberOfLines={3}
              placeholder="Write something about yourself"
              placeholderTextColor={colors.textSecondary}
            />
          </Animated.View>
        ) : (
          <Text style={[styles.profileBio, { color: colors.textSecondary }]}>
            {bio}
          </Text>
        )}
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(300).duration(500)}
        style={styles.sectionContainer}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {strings.app.profile.accountInfo}
        </Text>
        
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              ...shadows.sm,
            },
          ]}
        >
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.primary[100] },
              ]}
            >
              <Calendar size={20} color={colors.primary[600]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {strings.app.profile.memberSince}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user?.metadata?.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString() 
                  : new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.secondary[100] },
              ]}
            >
              <Bell size={20} color={colors.secondary[600]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {strings.app.profile.notifications}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                Enabled
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      
      {isEditing && (
        <Animated.View
          entering={FadeIn.delay(400).duration(300)}
          style={styles.actionButtons}
        >
          <Button
            title={strings.common.cancel}
            onPress={() => {
              setIsEditing(false);
              fadeAnim.value = withTiming(0, { duration: 300 });
              // Reset values
              setName(user?.displayName || '');
              setBio('Product Designer based in San Francisco');
            }}
            variant="outline"
            style={{ flex: 1, marginRight: spacing.sm }}
          />
          <Button
            title={strings.app.profile.save}
            onPress={saveChanges}
            loading={isSaving}
            style={{ flex: 1, marginLeft: spacing.sm }}
          />
        </Animated.View>
      )}
    </Screen>
  );
}

// Helper function for animation
function interpolate(value, inputRange, outputRange) {
  'worklet';
  if (value <= inputRange[0]) {
    return outputRange[0];
  }
  if (value >= inputRange[1]) {
    return outputRange[1];
  }
  return outputRange[0] + (value - inputRange[0]) * (outputRange[1] - outputRange[0]) / (inputRange[1] - inputRange[0]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerTitle: {
    ...typography.headingMedium,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
  },
  profileImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    ...typography.headingLarge,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.titleLarge,
    marginBottom: spacing.xxs,
  },
  profileEmail: {
    ...typography.bodyMedium,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: spacing.md,
  },
  profileBio: {
    ...typography.bodyMedium,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.titleMedium,
    marginBottom: spacing.md,
  },
  infoCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...typography.bodySmall,
    marginBottom: spacing.xxs,
  },
  infoValue: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.medium,
  },
  nameInput: {
    ...typography.titleLarge,
    marginBottom: spacing.xxs,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
  },
  bioEditContainer: {
    width: '100%',
  },
  bioLabel: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  bioInput: {
    ...typography.bodyMedium,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
});