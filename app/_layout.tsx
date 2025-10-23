import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import CustomHeaderAuth from "./custom/customheaderauth";
export default function RootLayout() {
  return (
    <>
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffffff" }, // mặc định nền trắng
        headerTintColor: "white", // màu chữ/title mặc định
        headerShadowVisible: false, // bỏ line dưới
        headerTitle: "", // ẩn title mặc định
        headerBackVisible: false, // tắt back mặc định -> dùng CustomHeaderAuth
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/signup"
        options={{
          headerShown: true,
          headerLeft: () => (
            <CustomHeaderAuth showTitle={true} title="Sign Up" />
          ),
        }}
      />
      <Stack.Screen
        name="auth/signin"
        options={{
          headerShown: true,
          headerLeft: () => (
            <CustomHeaderAuth showTitle={true} title="Sign In" />
          ),
        }}
      />
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="buyandpay/cart"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='buyandpay/checkout'
        options={{ headerShown: false}}
      />
    </Stack>
    <Toast />
    </>
  );
}
