import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import apiService from "../apiservices/apiservices";
interface Role {
  idRole: number;
  NameRole: string;
}
interface User {
  idUser: number;
  Email: string;
  Role: Role;
  IsActive: boolean;
}
interface LoginResponse {
  message: string;
  redirect: string;
  user: User;
}
interface UserLogin {
  Email: string;
  Password: string;
}
export default function SignIn() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [form, setForm] = useState<UserLogin>({
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

 const handleLogin = async () => {
  if (!form.Email || !form.Password) {
    Toast.show({
      type: 'error',
      text1: 'Vui lòng nhập đầy đủ Email và Password',
      position: 'bottom',
      visibilityTime: 1500,
      autoHide: true,
    });
    // Alert.alert("Thông báo", "Vui lòng nhập đầy đủ Email và Password");
    return;
  }

 try {
      setLoading(true);

      const response = await apiService.post<LoginResponse>(
        "/admin/auth/login",
        form
      );

      if (response.data?.user) {
        // Lưu user vào AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
        // Alert.alert(
        //   "Thông báo",
        //   response.data.message || "Đăng nhập thành công"
        // );

        router.push("../home/homescreens");
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || "Tài khoản hoặc mật khẩu không đúng",
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
        // Alert.alert(
        //   "Thông báo",
        //   response.error || "Tài khoản hoặc mật khẩu không đúng"
        // );
      }
    } catch (err) {
      console.log("Login error:", err);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra trong quá trình đăng nhập',
        position: 'bottom',
        visibilityTime: 1500,
        autoHide: true,
      });
      //
      // Alert.alert("Đăng nhập thất bại", "Có lỗi xảy ra");
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {loading ? "Đang xử lý..." : "Sign In"}
        </Text>
      </TouchableOpacity>
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
