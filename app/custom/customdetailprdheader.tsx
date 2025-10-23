import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export default function CustomDetailPrdHeader() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push("/home/categories")} style={{ backgroundColor: "white", borderRadius: 20, padding: 5, elevation: 3}}>
      <Ionicons name="arrow-back" size={30} color="{black}"  />
      </TouchableOpacity>
      <View style={styles.cartWrapper}>
        <TouchableOpacity onPress={() => router.push("../buyandpay/cart")}>
          <Ionicons name="cart-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flex:1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins_700Bold",
  },
  cartWrapper: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 20,
    padding: 5,
  },
});
