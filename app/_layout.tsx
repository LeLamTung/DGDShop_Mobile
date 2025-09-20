import { Stack } from "expo-router";
import CustomHeaderBack from "../app/custom/customheaderback";
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffffff" }, // mặc định nền trắng
        headerTintColor: "white", // màu chữ/title mặc định
        headerShadowVisible: false, // bỏ line dưới
        headerTitle: "", // ẩn title mặc định
        headerBackVisible: false, // tắt back mặc định -> dùng CustomHeaderBack
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/signup"
        options={{
          headerShown: true,
          headerLeft: () => (
            <CustomHeaderBack showTitle={true} title="Sign Up" />
          ),
        }}
      />
      <Stack.Screen name="auth/signin" 
      options={{ 
        headerShown: true,
        headerLeft: () => (
          <CustomHeaderBack showTitle={true} title="Sign In" />
        ),
         }} />
    </Stack>
  );
}
