import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Screen from '@/components/layout/Screen';
import { typography, spacing, strings, shadows, borderRadius } from '@/constants';
import { Bell, Search, MessageSquare, CalendarClock, FileText, Settings, Plus } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const QuickActionCard = ({ icon, title, onPress, color }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        { backgroundColor: colors.card, ...shadows.md },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={[styles.quickActionTitle, { color: colors.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ActivityItem = ({ title, description, time, iconBg, icon }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.activityItem, { borderBottomColor: colors.border }]}>
      <View style={[styles.activityIconContainer, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.activityDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <Text style={[styles.activityTime, { color: colors.textSecondary }]}>
        {time}
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  
  const quickActions = [
    { 
      icon: <MessageSquare size={24} color="#FFFFFF" />, 
      title: 'Messages', 
      color: colors.primary[500], 
      onPress: () => {} 
    },
    { 
      icon: <CalendarClock size={24} color="#FFFFFF" />, 
      title: 'Schedule', 
      color: colors.secondary[500], 
      onPress: () => {} 
    },
    { 
      icon: <FileText size={24} color="#FFFFFF" />, 
      title: 'Documents', 
      color: colors.accent[500], 
      onPress: () => {} 
    },
    { 
      icon: <Settings size={24} color="#FFFFFF" />, 
      title: 'Settings', 
      color: colors.neutral[600], 
      onPress: () => {} 
    },
  ];
  
  const activities = [
    {
      title: 'New Message',
      description: 'You received a new message from Sarah',
      time: '2m ago',
      iconBg: colors.primary[100],
      icon: <MessageSquare size={20} color={colors.primary[600]} />,
    },
    {
      title: 'Meeting Scheduled',
      description: 'Team meeting tomorrow at 10:00 AM',
      time: '1h ago',
      iconBg: colors.secondary[100],
      icon: <CalendarClock size={20} color={colors.secondary[600]} />,
    },
    {
      title: 'Document Updated',
      description: 'Project proposal has been updated',
      time: '3h ago',
      iconBg: colors.accent[100],
      icon: <FileText size={20} color={colors.accent[600]} />,
    },
  ];
  
  return (
    <Screen style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
            {strings.app.home.welcome}
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.displayName || 'User'}
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.iconButton, 
              styles.notificationButton,
              { backgroundColor: colors.card },
            ]}
          >
            <Bell size={24} color={colors.text} />
            <View style={[styles.badge, { backgroundColor: colors.accent[500] }]} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(200).duration(500)}
        style={styles.quickActionsContainer}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {strings.app.home.quickActions}
        </Text>
        
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              color={action.color}
              onPress={action.onPress}
            />
          ))}
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(300).duration(500)}
        style={styles.recentActivityContainer}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {strings.app.home.recentActivity}
          </Text>
          
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary[500] }]}
          >
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View 
          style={[
            styles.activityList, 
            { backgroundColor: colors.card, ...shadows.sm },
          ]}
        >
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                iconBg={activity.iconBg}
                icon={activity.icon}
              />
            ))
          ) : (
            <Text style={[styles.noActivityText, { color: colors.textSecondary }]}>
              {strings.app.home.noActivity}
            </Text>
          )}
        </View>
      </Animated.View>
    </Screen>
  );
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
  welcomeText: {
    ...typography.bodyMedium,
  },
  userName: {
    ...typography.headingSmall,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  notificationButton: {
    position: 'relative',
    ...shadows.sm,
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  quickActionsContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.titleMedium,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.medium,
  },
  recentActivityContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityList: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.medium,
    marginBottom: spacing.xxs,
  },
  activityDescription: {
    ...typography.bodySmall,
  },
  activityTime: {
    ...typography.caption,
  },
  noActivityText: {
    ...typography.bodyMedium,
    padding: spacing.md,
    textAlign: 'center',
  },
});