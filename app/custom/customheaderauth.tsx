import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
export default function CustomHeaderAuth({
  showTitle = false,
  title = "Back",
  color = "#000",
}) {
  const router = useRouter();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 5,
          elevation: 3,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={30} color={color} />
      </TouchableOpacity>
      {showTitle && (
        <Text
          style={{
            color,
            marginLeft: 20,
            fontSize: 30,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
}
