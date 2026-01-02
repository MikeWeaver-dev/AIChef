import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ShoppingBasket, Plus, Edit2, Trash2, Check, X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  // Load pantry items from AsyncStorage on mount
  useEffect(() => {
    loadPantryItems();
  }, []);

  const loadPantryItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('pantryItems');
      if (stored) {
        setPantryItems(JSON.parse(stored));
      } else {
        // Set default items if nothing stored
        const defaultItems = [
          { id: 1, name: "eggs", quantity: "one dozen" },
          { id: 2, name: "chicken breast", quantity: "2 lbs" },
          { id: 3, name: "pasta", quantity: "1 box" },
          { id: 4, name: "rice", quantity: "2 lbs" },
          { id: 5, name: "olive oil", quantity: "1 bottle" },
          { id: 6, name: "garlic", quantity: "1 bulb" },
          { id: 7, name: "onions", quantity: "3 medium" },
          { id: 8, name: "tomatoes", quantity: "4 large" }
        ];
        setPantryItems(defaultItems);
        await AsyncStorage.setItem('pantryItems', JSON.stringify(defaultItems));
        setShowWelcome(true); // Show welcome message for first-time users
      }
    } catch (error) {
      console.error('Error loading pantry items:', error);
    }
  };

  const savePantryItems = async (items) => {
    try {
      await AsyncStorage.setItem('pantryItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving pantry items:', error);
    }
  };

  const handleAdd = () => {
    if (!newItem.trim()) return;
    
    const newId = Math.max(0, ...pantryItems.map(item => item.id || 0)) + 1;
    const updatedItems = [
      { id: newId, name: newItem.trim(), quantity: newQuantity.trim() || "1x" },
      ...pantryItems
    ];
    
    setPantryItems(updatedItems);
    savePantryItems(updatedItems);
    setNewItem("");
    setNewQuantity("");
    setShowAddForm(false);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    
    const updatedItems = pantryItems.map(item =>
      item.id === id ? { ...item, name: editName.trim(), quantity: editQuantity.trim() } : item
    );
    
    setPantryItems(updatedItems);
    savePantryItems(updatedItems);
    setEditingId(null);
    setEditName("");
    setEditQuantity("");
  };

  const handleDelete = (id) => {
    const updatedItems = pantryItems.filter(item => item.id !== id);
    setPantryItems(updatedItems);
    savePantryItems(updatedItems);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditQuantity("");
  };

  return (
    <ScrollView className="flex-1 bg-[#fff4e6]">
      <View className="px-4 pt-8 pb-6">

        {/* Header Section */}
        <View className="items-center mb-8 mt-10">
          <View className="w-20 h-20 rounded-full bg-orange-400 items-center justify-center mb-5 shadow-lg shadow-orange-400/50">
            <ShoppingBasket color="#fff" size={40} />
          </View>
          <Text className="text-[42px] font-bold text-orange-800 mb-2 text-center">My Pantry</Text>
          <Text className="text-base text-gray-600 text-center">
            Manage your available ingredients
          </Text>
        </View>

        
        {/* Welcome Banner - shown only on first load */}
        {showWelcome && (
          <View className="mb-6 relative">
            <View className="absolute -inset-[2px] rounded-2xl bg-orange-400 opacity-30" />
            <View className="bg-orange-100 rounded-2xl p-5 shadow-lg">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center gap-2 flex-1">
                  <ShoppingBasket color="#c2410c" size={24} />
                  <Text className="text-lg font-bold text-orange-800">Welcome!</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowWelcome(false)}
                  className="p-1"
                  activeOpacity={0.7}
                >
                  <X color="#c2410c" size={20} />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-700 leading-relaxed">
                Your pantry has been pre-filled with starter items to help you demo the app. 
                Feel free to edit or remove items as needed!
              </Text>
            </View>
          </View>
        )}        
{/*        
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('pantryItems');
            loadPantryItems();
          }}
          className="mb-4 px-4 py-2 bg-red-500 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Reset Pantry (Testing)</Text>
        </TouchableOpacity> */}

        {/* Add New Item Button/Form */}
        <View className="mb-6">
          {!showAddForm ? (
            <TouchableOpacity
              onPress={() => setShowAddForm(true)}
              className="flex-row items-center justify-center px-6 py-4 bg-orange-200 rounded-2xl shadow-md"
              activeOpacity={0.7}
            >
              <Plus color="#fff" size={24} />
              <Text className="text-white font-semibold text-lg">Add New Item</Text>
            </TouchableOpacity>
          ) : (
            <View className="relative">
              <View className="absolute -inset-[2px] rounded-2xl bg-orange-400 opacity-25" />
              <View className="bg-orange-50 rounded-2xl p-6 shadow-lg">
                <Text className="text-xl font-semibold text-orange-800 mb-4">Add New Item</Text>
                <View className="gap-3">
                  <TextInput
                    value={newItem}
                    onChangeText={setNewItem}
                    placeholder="Item name (e.g., Chicken)"
                    placeholderTextColor="#9ca3af"
                    className="px-4 py-3 bg-orange-100 border-2 border-orange-300 rounded-xl text-gray-700"
                  />
                  <TextInput
                    value={newQuantity}
                    onChangeText={setNewQuantity}
                    placeholder="Quantity (e.g., 2 lbs, 500g)"
                    placeholderTextColor="#9ca3af"
                    className="px-4 py-3 bg-orange-100 border-2 border-orange-300 rounded-xl text-gray-700"
                  />
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={handleAdd}
                      disabled={!newItem.trim()}
                      className={`flex-1 px-6 py-3 rounded-xl ${
                        newItem.trim() ? 'bg-orange-300' : 'bg-gray-300'
                      }`}
                      activeOpacity={0.7}
                    >
                      <Text className="text-white font-semibold text-center">Add Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowAddForm(false);
                        setNewItem("");
                        setNewQuantity("");
                      }}
                      className="flex-1 px-6 py-3 bg-gray-300 rounded-xl"
                      activeOpacity={0.7}
                    >
                      <Text className="text-white font-semibold text-center">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Pantry Items List */}
        {pantryItems.length > 0 ? (
          <View className="gap-4">
            {pantryItems.map((item) => (
              <View key={item.id} className="relative">
                <View className="absolute -inset-[2px] rounded-xl bg-orange-400 opacity-20" />
                <View className="bg-orange-50 rounded-xl p-4 shadow-md">
                  {editingId === item.id ? (
                    // Edit Mode
                    <View className="gap-3">
                      <TextInput
                        value={editName}
                        onChangeText={setEditName}
                        className="px-3 py-2 border-2 border-orange-300 rounded-lg text-gray-700 bg-orange-100"
                        placeholder="Item name"
                        placeholderTextColor="#9ca3af"
                      />
                      <TextInput
                        value={editQuantity}
                        onChangeText={setEditQuantity}
                        className="px-3 py-2 border-2 border-orange-300 rounded-lg text-gray-700 bg-orange-100"
                        placeholder="Quantity"
                        placeholderTextColor="#9ca3af"
                      />
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => handleUpdate(item.id)}
                          disabled={!editName.trim()}
                          className={`flex-1 flex-row items-center justify-center gap-2 py-1 rounded-lg ${
                            editName.trim() ? 'bg-green-500/50' : 'bg-gray-300/50'
                          }`}
                          activeOpacity={0.7}
                        >
                          <Check color="#fff" size={16} />
                          <Text className="text-white font-semibold mr-4 mb-1.5">Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={cancelEdit}
                          className="flex-1 flex-row items-center justify-center gap-2 bg-gray-400/50 rounded-lg"
                          activeOpacity={0.7}
                        >
                          <X color="#fff" size={16} />
                          <Text className="text-white font-semibold mr-4 mb-1.5">Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    // View Mode
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-gray-800 font-semibold text-lg">{item.name}</Text>
                        <Text className="text-gray-600 text-sm">{item.quantity}</Text>
                      </View>
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => startEdit(item)}
                          className="p-2 bg-orange-200 rounded-lg"
                          activeOpacity={0.7}
                        >
                          <Edit2 color="#c2410c" size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDelete(item.id)}
                          className="p-2 bg-red-200 rounded-lg"
                          activeOpacity={0.7}
                        >
                          <Trash2 color="#dc2626" size={18} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="items-center py-16 px-4">
            <View className="p-6 bg-orange-100 rounded-full mb-6">
              <ShoppingBasket color="#fb923c" size={64} />
            </View>
            <Text className="text-gray-500 text-lg mb-2">Your pantry is empty</Text>
            <Text className="text-gray-400">Add some ingredients to get started!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}