import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { ChefHat } from 'lucide-react-native';

export default function LoadingScreen({ onLoadingComplete }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -45,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to main app after 2.5 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#fff4e6] items-center justify-center">
      <Animated.View 
        style={{ 
          opacity: fadeAnim,
          transform: [{ translateY: bounceAnim }]
        }}
        className="items-center"
      >
        <View className="w-45 h-45 rounded-full bg-orange-50/100 items-center justify-center mb-8">
          <ChefHat color="#fb923c" size={56} />
        </View>
      </Animated.View>
      <Text className="text-3xl font-bold text-orange-800 mb-3">Loading App</Text>
    </View>
  );
}