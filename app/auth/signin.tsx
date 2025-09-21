import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function signup() {
  let [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleLogin = () => {
    // Xử lý đăng nhập ở đây
    console.log("Đăng nhập");
    router.push("../home/homescreens");
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Email</Text>
        <TextInput style={{ borderBottomWidth: 0.5 }} />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Password</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ flex: 1, borderBottomWidth: 0.5, paddingRight: 40 }}
            secureTextEntry={!showPassword} // ẩn/hiện ký tự
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 0, padding: 8 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogin();
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputbgr: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 40,
    padding: 10,
    elevation: 2,
    borderRadius: 10,
  },
  inputlabel: {
    color: "#555",
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#F2896C",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 40,
    marginHorizontal: 20,
  },
  SigninNav: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
