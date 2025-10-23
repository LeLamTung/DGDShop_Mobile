import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function CustomHeader({ routeName }: { routeName: string }) {
  const router = useRouter();

  let title = "";
  if (routeName === "homescreens") title = "Home";
  if (routeName === "categories") title = "Category";

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
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
