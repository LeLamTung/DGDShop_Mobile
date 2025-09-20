import apiService from "@/app/apiservices/apiservices";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function index() {
  const handlesubmit = async () => {
    try {
      const response = await apiService.get<any>("/sanpham/getall");
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Form Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default index;
