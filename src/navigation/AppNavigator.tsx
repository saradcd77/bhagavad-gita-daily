import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import {
  HomeScreen,
  AskKrishnaScreen,
  ExploreScreen,
  FavoritesScreen,
  ProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  emoji: string;
  label: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ emoji, label, focused }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabEmoji, { opacity: focused ? 1 : 0.6 }]}>{emoji}</Text>
      <Text
        style={[
          styles.tabLabel,
          {
            color: focused ? theme.colors.secondary : theme.colors.textMuted,
            fontWeight: focused ? '600' : '400',
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 24,
          height: 80,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Today" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="AskKrishna"
        component={AskKrishnaScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🙏" label="Ask" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔍" label="Explore" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💛" label="Saved" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" label="Settings" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  tabEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
  },
});

