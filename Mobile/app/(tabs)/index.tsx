import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { ChefHat, Send, Sparkles } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Chef() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [pantryItems, setPantryItems] = useState([]);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Load pantry items whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadPantryItems();
    }, [])
  );

  const loadPantryItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('pantryItems');
      if (stored) {
        const items = JSON.parse(stored);
        // @ts-ignore
        setPantryItems(items.map(item => item.name));
      } else {
        setPantryItems([]);
      }
    } catch (error) {
      console.error('Error loading pantry items:', error);
      setPantryItems([]);
    }
  };
  
    const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [loading]);

  // Bounce animation effect
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bounceAnim.setValue(0);
    }
  }, [loading]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse("");
    
    try {
      const fullPrompt = `You are a helpful cooking assistant. Here are the rules:
        1) If the user asks for help with a recipe, provide the dish name and full recipe with ingredients and instructions.
        2) If the user asks about something other than cooking, answer politely.
        3) Cook with anything you want, but show preference for items in the user's pantry: ${pantryItems.join(", ")}.
        4) If suggesting other ingredients, remind the user they may need to buy those.

        User request: ${prompt}`;

      const response = await fetch("https://aichefbackend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, there was an error getting your recipe. Please make sure the server is running and you're connected to the internet.");
    }
    
    setLoading(false);
  };

  const handleClear = () => {
    setResponse("");
    setPrompt("");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-[#fff4e6]">
        <View className="px-4 pt-8 pb-6">
          {/* Header Section */}
          <View className="items-center mb-8 mt-10">
            <View className="w-20 h-20 rounded-full bg-orange-400 items-center justify-center mb-5 shadow-lg shadow-orange-400/50">
              <ChefHat color="#fff" size={40} />
            </View>
            <Text className="text-[42px] font-bold text-orange-800 mb-2 text-center">AI Chef</Text>
            <Text className="text-base text-gray-600 text-center px-4">
              Type in what you're craving and I can help find the perfect recipe
            </Text>
          </View>

          {/* Main Input Card */}
          <View className="mb-6 relative">
            <View className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-orange-300 to-orange-400 opacity-20" />
            
            <View className="bg-orange-50 rounded-3xl p-6 shadow-xl">
              {/* Pantry Preview */}
              <View className="mb-5">
                <View className="flex-row items-center gap-2 mb-3">
                  <Sparkles color="#fb923c" size={20} />
                  <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your Pantry</Text>
                </View>
                {pantryItems.length > 0 ? (
                  <View className="flex-row flex-wrap gap-2">
                    {pantryItems.map((item, idx) => (
                      <View key={idx} className="px-3 py-1.5 bg-orange-100 rounded-full">
                        <Text className="text-orange-700 text-sm font-medium">{item}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-gray-500 text-sm italic">No items in your pantry yet. Add some in the Pantry tab!</Text>
                )}
              </View>

              {/* Input Area */}
              <View className="relative">
                <TextInput
                  value={prompt}
                  onChangeText={setPrompt}
                  placeholder="Describe your ideal meal..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={3}
                  className="bg-orange-50/50 p-4 pr-16 border-2 border-orange-200 rounded-2xl text-gray-700 min-h-[80px]"
                  style={{ textAlignVertical: 'top' }}
                />
                
                {/* Send Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading || !prompt.trim()}
                  className={`absolute bottom-3 right-3 w-12 h-12 rounded-full items-center justify-center shadow-lg ${
                    loading || !prompt.trim() ? 'bg-gray-400' : 'bg-orange-400'
                  }`}
                  activeOpacity={0.7}
                >
                  {loading ? (
                    <Animated.View
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: '#fff',
                        borderTopColor: 'transparent',
                        borderRadius: 10,
                        transform: [{
                          rotate: spinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                          })
                        }]
                      }}
                    />
                  ) : (
                    <Send color="#fff" size={20} />
                  )}
                  </TouchableOpacity>
              </View>

              <Text className="text-xs text-gray-500 mt-3 text-center">
                Press send to get your recipe
              </Text>
            </View>
          </View>

          {/* Loading State */}
          {loading && (
            <View className="mb-6 relative">
              <View className="absolute -inset-[2px] rounded-2xl bg-orange-400 opacity-40" />
              <View className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <View className="flex-row items-center justify-center gap-3">
                  <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
                    <ChefHat color="#c2410c" size={24} />
                  </Animated.View>
                  <Text className="text-lg font-medium text-orange-700">Cooking up something delicious...</Text>
                </View>
              </View>
            </View>
          )}

          {/* Response Card */}
          {response && !loading && (
            <View className="relative mb-6 shadow-lg">
              <View className="absolute -inset-[2px] rounded-2xl bg-orange-400 opacity-40" />
              
              <View className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header Banner */}
                <View className="bg-orange-200 p-4">
                  <View className="flex-row items-center gap-3">
                    <ChefHat color="#fff" size={32} />
                    <Text className="text-2xl text-white font-bold">Your Recipe</Text>
                  </View>
                </View>
                
                {/* Content */}
                <View className="p-6 bg-orange-50 shadow-lg">
                  <Text className="text-gray-700 text-base leading-relaxed shadow-lg">
                    {response}
                  </Text>

                  {/* Action Buttons */}
                  <View className="flex-row gap-3 mt-6 pt-6 border-t border-orange-200">
                    <TouchableOpacity 
                      onPress={handleClear}
                      className="flex-1 px-6 py-3 bg-orange-100 border-orange-400 rounded-xl shadow-sm"
                      activeOpacity={0.8}
                    >
                      <Text className="text-orange-700 font-semibold text-center">Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handleSubmit}
                      className="flex-1 px-6 py-3 bg-orange-100 rounded-xl shadow-sm"
                      activeOpacity={0.8}
                    >
                      <Text className="text-orange-700 font-semibold text-center">Try Another</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Empty State */}
          {!response && !loading && (
            <View className="items-center py-8 px-4">
              <View className="p-6 bg-orange-100 rounded-full mb-6 shadow-md shadow-orange-200/50">
                <ChefHat color="#fb923c" size={64} />
              </View>
              <Text className="text-gray-500 text-lg mb-2">Ready to create something delicious?</Text>
              <Text className="text-gray-400 ml-3">Describe your ideal meal above and let's get cooking!</Text>
            </View>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}