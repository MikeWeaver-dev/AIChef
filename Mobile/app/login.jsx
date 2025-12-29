import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Later you’ll add real auth
    router.replace("/(tabs)"); // Goes straight to AI Chef (home tab)
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#fff4e6] p-4">
      <Text className="text-3xl font-bold text-orange-700 mb-6">
        Login
      </Text>

      <TextInput
        placeholder="Username"
        className="border px-4 py-2 w-full max-w-md mb-4 rounded-lg"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border px-4 py-2 w-full max-w-md mb-6 rounded-lg"
      />

      <Pressable
        onPress={handleLogin}
        className="bg-orange-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Log In</Text>
      </Pressable>
    </View>
  );
}