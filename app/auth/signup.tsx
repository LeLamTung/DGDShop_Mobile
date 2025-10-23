import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import apiService from "../apiservices/apiservices";
interface Role {
  idRole: number;
  NameRole: string;
}
interface User {
  idUser: number;
  UserName: string;
  Email: string;
  Role: Role;
  IsActive: boolean;
  GoogleId: number | null;
  CreatedAt: string;
}
interface SignUpResponse {
  cod: number;
  message: string;
  data: User;
}
interface UserSignUp {
  UserName: string;
  Email: string;
  Password: string;
}
export default function SignUp() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const [form, setForm] = useState<UserSignUp>({
    UserName: "",
    Email: "",
    Password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(""); // nhập lại mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignUp = async () => {
    if (
      form.UserName.trim() === "" ||
      form.Email.trim() === "" ||
      form.Password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin !");
      return;
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.Email)) {
      Alert.alert("Thông báo", "Email không hợp lệ, vui lòng nhập lại!");
      return;
    }

    if (form.Password !== confirmPassword) {
      
      Alert.alert("Thông báo", "Mật khẩu nhập lại không chính xác !");
      return;
    }

    try {
      setLoading(true);

      const response = await apiService.post<SignUpResponse>(
        "/admin/auth/register",
        form
      );
      if (response.data) {
        Toast.show({
          type: 'success',
          text1: response.data.message || "Đăng ký thành công",
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
        // Alert.alert("Thông báo", response.data.message || "Đăng ký thành công");
        router.push("../auth/signin");
      } else {
        Alert.alert(
          "Thông báo",
          response.error || "Có lỗi khi đăng ký tài khoản"
        );
      }
    } catch (err) {
      console.log("Sign up error:", err);
      Alert.alert("Đăng ký thất bại", "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Username</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.UserName}
          onChangeText={(text) => setForm({ ...form, UserName: text })}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Email</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.Email}
          onChangeText={(text) => setForm({ ...form, Email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Password</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ flex: 1, borderBottomWidth: 0.5, paddingRight: 40 }}
            secureTextEntry={!showPassword}
            value={form.Password}
            onChangeText={(text) => setForm({ ...form, Password: text })}
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
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Nhập lại mật khẩu</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ flex: 1, borderBottomWidth: 0.5, paddingRight: 40 }}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
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
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {loading ? "Đang xử lý..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <View style={styles.SigninNav}>
        <Link href="/auth/signin">
          <Text style={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}>
            Already have an account?{" "}
            <Text style={{ color: "#F2896C" }}>Sign in</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
