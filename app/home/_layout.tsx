import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomHeader from "../custom/customheader";

export default function TabLayout() {
  const activeBg = "#fff";
  const inactiveBg = "rgba(255,255,255,0.3)";
  const activeColor = "#F2896C";
  const inactiveColor = "#fff";
  const iconsize = 30;
  const iconWrapperWidthUnfocused = 40;
  const iconWrapperWidthFocused = 110;
  const iconWrapperCate = 120;
    let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;

  return (
     <Tabs
      screenOptions={({ route }) => ({
        headerShown: !(route.name === "cart" || route.name === "account"),
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerShadowVisible: false,

         //  Gọi CustomHeader thay vì code trực tiếp
        headerTitle: () => <CustomHeader routeName={route.name} />,
        headerRight: () => null, // đã xử lý trong CustomHeader
      })}
    >
      <Tabs.Screen
        name="homescreens"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: focused ? activeBg : inactiveBg,
                  width: focused ? iconWrapperWidthFocused : iconWrapperWidthUnfocused,
                },
              ]}
            >
              <IconSymbol
                size={iconsize}
                name="house.fill"
                color={focused ? activeColor : inactiveColor}
              />
              {focused && (
                <Text style={[styles.label, { color: activeColor }]}>Home</Text>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: focused ? activeBg : inactiveBg,
                  width: focused ? iconWrapperCate : iconWrapperWidthUnfocused,
                },
              ]}
            >
              <IconSymbol
                size={iconsize}
                name="grid"
                color={focused ? activeColor : inactiveColor}
              />
              {focused && (
                <Text style={[styles.label, { color: activeColor }]}>
                  Categories
                </Text>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: focused ? activeBg : inactiveBg,
                  width: focused ? iconWrapperWidthFocused : iconWrapperWidthUnfocused,
                },
              ]}
            >
              <IconSymbol
                size={iconsize}
                name="person.fill"
                color={focused ? activeColor : inactiveColor}
              />
              {focused && (
                <Text style={[styles.label, { color: activeColor }]}>
                  Account
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 40,
    borderRadius: 25,
    backgroundColor: "#F2896C", // màu tabbar
    height: 60,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 5,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 40,
    marginTop: 20,
  },
  label: {
    marginLeft: 6,
    fontWeight: "600",
  },
});
