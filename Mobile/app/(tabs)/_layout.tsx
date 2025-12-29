import { Tabs } from 'expo-router';
import React from 'react';
import { ChefHat, ShoppingBasket, User, Rocket } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs      
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F97316", // Orange
        tabBarInactiveTintColor: "#4B5563", // Gray
        tabBarStyle: {
          backgroundColor: "#fffbeb",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 10,
        },
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI Chef',
          tabBarIcon: ({ color }) => <ChefHat size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'My Pantry',
          tabBarIcon: ({ color }) => <ShoppingBasket size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="otherApps"
        options={{
          title: 'Other Apps',
          tabBarIcon: ({ color }) => <Rocket size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{ href: null }}
      />
    </Tabs>
  );
}