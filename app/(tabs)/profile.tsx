import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { User, Mail, Camera, Edit, Check, X } from 'lucide-react-native';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME } from '@/constants/settings';

export default function ProfileScreen() {
  const { user, updateUserProfile, error: authError, isLoading, clearError } = useAuth();
  const { translate } = useLanguage();
  const { isDark } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [error, setError] = useState<string | null>(null);
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setDisplayName(user?.displayName || '');
    setError(null);
    clearError();
  };
  
  // Save profile changes
  const saveProfile = async () => {
    // Validate inputs
    if (!displayName.trim()) {
      setError('Name is required');
      return;
    }
    
    try {
      await updateUserProfile(displayName);
      setIsEditing(false);
    } catch (err) {
      // Error is handled by the auth context
    }
  };
  
  // Get text color based on theme
  const getTextColor = () => {
    return isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary;
  };
  
  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary;
  };
  
  // Profile photo placeholder
  const profilePhotoUrl = user?.photoURL || 'https://images.pexels.com/photos/1236678/pexels-photo-1236678.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  return (
    <AppLayout>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Profile header with photo */}
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.profileHeader}
        >
          <View style={styles.profilePhotoContainer}>
            <Image
              source={{ uri: profilePhotoUrl }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity 
              style={[
                styles.cameraButton,
                { backgroundColor: isDark ? THEME.colors.neutral[800] : THEME.colors.neutral[100] }
              ]}
              onPress={() => Platform.OS === 'web' ? 
                Alert.alert('Not available', 'Camera feature is not available on web') : 
                null}
            >
              <Camera 
                size={18} 
                color={isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.profileName, { color: getTextColor() }]}>
            {user?.displayName || 'User'}
          </Text>
          <Text style={[styles.profileEmail, { color: getSecondaryTextColor() }]}>
            {user?.email}
          </Text>
        </Animated.View>
        
        {/* Profile details card */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(200)}
        >
          <Card style={styles.profileCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: getTextColor() }]}>
                {isEditing ? translate('editProfile') : translate('profile')}
              </Text>
              
              {!isEditing ? (
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={toggleEditMode}
                >
                  <Edit 
                    size={20} 
                    color={THEME.colors.primary[500]} 
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.editModeButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={toggleEditMode}
                  >
                    <X 
                      size={20} 
                      color={THEME.colors.error.default} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={saveProfile}
                    disabled={isLoading}
                  >
                    <Check 
                      size={20} 
                      color={THEME.colors.success.default} 
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            {/* Error messages */}
            {(error || authError) && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || authError}</Text>
              </View>
            )}
            
            {isEditing ? (
              // Edit mode
              <View style={styles.editForm}>
                <Input
                  label={translate('displayName')}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="John Doe"
                  icon={<User size={20} color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} />}
                  style={styles.input}
                />
                
                <Button
                  title={translate('updateProfile')}
                  onPress={saveProfile}
                  loading={isLoading}
                  style={styles.saveProfileButton}
                />
              </View>
            ) : (
              // View mode
              <View style={styles.profileInfo}>
                <View style={styles.infoRow}>
                  <User 
                    size={20} 
                    color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} 
                    style={styles.infoIcon}
                  />
                  <View>
                    <Text style={[styles.infoLabel, { color: getSecondaryTextColor() }]}>
                      {translate('name')}
                    </Text>
                    <Text style={[styles.infoValue, { color: getTextColor() }]}>
                      {user?.displayName || 'Not set'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.infoRow}>
                  <Mail 
                    size={20} 
                    color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} 
                    style={styles.infoIcon}
                  />
                  <View>
                    <Text style={[styles.infoLabel, { color: getSecondaryTextColor() }]}>
                      {translate('email')}
                    </Text>
                    <Text style={[styles.infoValue, { color: getTextColor() }]}>
                      {user?.email}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.infoRow}>
                  <User 
                    size={20} 
                    color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} 
                    style={styles.infoIcon}
                  />
                  <View>
                    <Text style={[styles.infoLabel, { color: getSecondaryTextColor() }]}>
                      Role
                    </Text>
                    <Text style={[styles.infoValue, { color: getTextColor() }]}>
                      {user?.role || 'User'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Card>
        </Animated.View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: THEME.spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: THEME.spacing.xl,
  },
  profilePhotoContainer: {
    position: 'relative',
    marginBottom: THEME.spacing.m,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  profileName: {
    fontSize: THEME.typography.fontSize.xl,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.xs,
  },
  profileEmail: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
  },
  profileCard: {
    marginTop: THEME.spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.m,
  },
  cardTitle: {
    fontSize: THEME.typography.fontSize.l,
    fontFamily: THEME.typography.fontFamily.bold,
  },
  editButton: {
    padding: THEME.spacing.xs,
  },
  editModeButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    padding: THEME.spacing.xs,
    marginRight: THEME.spacing.s,
  },
  saveButton: {
    padding: THEME.spacing.xs,
  },
  profileInfo: {
    marginTop: THEME.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: THEME.spacing.s,
  },
  infoIcon: {
    marginRight: THEME.spacing.m,
    width: 24,
  },
  infoLabel: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.regular,
    marginBottom: THEME.spacing.xs,
  },
  infoValue: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.medium,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    marginVertical: THEME.spacing.m,
  },
  errorContainer: {
    backgroundColor: THEME.colors.error.light,
    borderRadius: THEME.borderRadius.m,
    padding: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
  },
  errorText: {
    color: THEME.colors.error.dark,
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
  },
  editForm: {
    marginTop: THEME.spacing.m,
  },
  input: {
    marginBottom: THEME.spacing.m,
  },
  saveProfileButton: {
    marginTop: THEME.spacing.s,
  },
});