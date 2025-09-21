import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function homescreens() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <View style={styles.bgrcolor}>
      <View style={styles.container}>
        <Text style={styles.slogan}>
          Powering {"\n"}
          Your Everyday Life!
        </Text>
        <View style={styles.banner}>
          <Image style={styles.bannerimg} source={require("../../assets/images/banner1.webp")}/>
        </View>
        <Text style={{fontFamily:"Poppins_400Regular", fontSize:20, marginTop:20}}>Newest Arrival</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newpdcontainer}>
          <Image source={require("../../assets/images/may-giat-toshiba-inverter-13-kg-tw-t21bu140uwv-mg-3-638762514229433474-700x467.jpg")} style={styles.prdimg}/>
                    <Image source={require("../../assets/images/may-giat-toshiba-inverter-13-kg-tw-t21bu140uwv-mg-3-638762514229433474-700x467.jpg")} style={styles.prdimg}/>
          <Image source={require("../../assets/images/may-giat-toshiba-inverter-13-kg-tw-t21bu140uwv-mg-3-638762514229433474-700x467.jpg")} style={styles.prdimg}/>
          <Image source={require("../../assets/images/may-giat-toshiba-inverter-13-kg-tw-t21bu140uwv-mg-3-638762514229433474-700x467.jpg")} style={styles.prdimg}/>
          <Image source={require("../../assets/images/may-giat-toshiba-inverter-13-kg-tw-t21bu140uwv-mg-3-638762514229433474-700x467.jpg")} style={styles.prdimg}/>
        </ScrollView>
        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgrcolor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 18,
  },
  slogan: {
    fontSize: 36,
    fontFamily: "Poppins_400Regular",
  },
  banner: {
    backgroundColor: "#F2896C",
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginTop: 15,
  },
  bannerimg: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "stretch",
  },
  newpdcontainer: {
    marginTop: 10,
  },
  prdimg: {
    width: 150,
    height: 200,
    elevation: 3,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 25,
  },
});
