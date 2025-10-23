import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
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
}
interface LogoutResponse{
  message: string;
}

export default function Account() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      // console.log(storedUser)
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleLogout = async () =>{
    try{
    const response = await apiService.post<LogoutResponse>(
      "/admin/auth/logout",
      {withCredentials:true}
    )
    Toast.show({
      type:'success',
      text1: response.data?.message || "Đã đăng xuất",
      position:'bottom',
      visibilityTime:1500,
      autoHide:true,
    });
    router.push("/");
  } catch(err){
      console.log('logout err',err)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.accinfowrapper}>
        <View style={styles.imgwrapper}>
          <Image
            source={require("../../assets/images/banner.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.infowrapper}>
          <Text style={styles.namenemail}>
            {user?.UserName || "Guest"}
          </Text>
          <Text style={[styles.namenemail, { color: "grey", fontSize: 14 }]}>
            {user?.Email || "No email"}
          </Text>
        </View>
        <View style={styles.orderwrapper}>
          <TouchableOpacity style={styles.orderbtn}>
            <Ionicons name="bag-handle-outline" size={30} />
            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>
              My Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.funcwrapper}>
        <View style={styles.btnwrapper}>
          <TouchableOpacity style={styles.funcbtn}>
            <View style={styles.funciconwrapper}>
              <Ionicons name="person-outline" size={22}/>
            </View>
            <Text style={styles.functext}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnwrapper}>
          <TouchableOpacity style={styles.funcbtn}>
            <View style={styles.funciconwrapper}>
              <Ionicons name="lock-closed-outline" size={22}/>
            </View>
            <Text style={styles.functext}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnwrapper}>
          <TouchableOpacity style={styles.funcbtn}>
            <View style={styles.funciconwrapper}>
              <Ionicons name="book-outline" size={22}/>
            </View>
            <Text style={styles.functext}>About</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnwrapper}>
          <TouchableOpacity style={styles.funcbtn} onPress={handleLogout}>
            <View style={styles.funciconwrapper}>
              <Ionicons name="log-out-outline" size={22}/>
            </View>
            <Text style={styles.functext}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  accinfowrapper: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  imgwrapper: {
    width: 100,
    height: 100,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  infowrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  namenemail: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  orderwrapper: {
    backgroundColor: "#fff",
    marginTop: 20,
    height: 90,
    width: "50%",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 10,
  },
  orderbtn: {
    alignItems: "center",
    gap: 7,
  },
  funcwrapper: {
    marginTop: 30,
    flex:1,
    backgroundColor:'#f2896c3b',
    borderRadius:20,
  },
  btnwrapper: {
    marginBottom:10,
  },
  funcbtn:{
    flexDirection: "row",
    alignItems:'center',
    height:70,
    marginHorizontal:25,
    borderBottomWidth:0.6,
  },
  funciconwrapper:{
    width:50,
    height:50,
    backgroundColor:'lightgrey',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginRight:12,
  },
  functext:{
    fontFamily:'Poppins_400Regular',
    fontSize:16,
  },
});
