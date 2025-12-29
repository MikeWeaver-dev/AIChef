// app/_layout.tsx   <-- This is the ROOT layout (top level in app folder)

import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import LoadingScreen from './loadingScreen'; // Adjust path if loadingScreen.tsx is in a subfolder, e.g. './JS/loadingScreen'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Optional backup timer in case the one in LoadingScreen fails
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      {/* Add other top-level screens here if you have any modal screens, etc. */}
    </Stack>
  );
}