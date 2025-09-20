import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Link } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function Index() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <ImageBackground
      source={require("../assets/images/BGRmobileapp.jpg")}
      resizeMode="cover"
      style={styles.bgrimage}
    >
      <View style={styles.overlay} />
      <View style={styles.titlectn}>
        <Text style={styles.shopname}>DGDStore</Text>
        <Text style={styles.slogan}>Quality You Can Count On</Text>
      </View>

      <View style={styles.buttoncontainer}>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity style={styles.actbutton}>
            <Text style={styles.buttontext}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity style={styles.actbutton1}>
            <Text style={styles.buttontext1}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgrimage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // phủ kín màn hình
    backgroundColor: "rgba(0,0,0,0.5)", // màu đen trong suốt (0.5 = 50%)
  },
  buttoncontainer: {
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: "20%",
  },
  actbutton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
  },
  buttontext: {
    marginHorizontal: 140,
    paddingVertical: 12,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  actbutton1: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10,
  },
  buttontext1: {
    marginHorizontal: 140,
    paddingVertical: 12,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  titlectn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  shopname: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 50,
  },
  slogan: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
});
