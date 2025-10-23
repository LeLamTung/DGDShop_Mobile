import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import apiService from "../apiservices/apiservices";

// Định nghĩa kiểu dữ liệu sản phẩm
interface Product {
  idProduct: number;
  ProductName: string;
  ImageName: string;
  SalePrice: number;
  Description: string;
  OriginalPrice: number;
}

interface ApiListResponse<T> {
  cod: number;
  data: T[];
}

export default function HomeScreens() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
  const fetchProducts = async () => {

    try {
      const response = await apiService.get<ApiListResponse<Product>>(
        "/client/product/list"
      );
      
      if (response.data) {
        setProducts(response.data.data.sort((a, b) => b.idProduct - a.idProduct).slice(0, 10)); // Lấy 10 sản phẩm mới nhất
      } else {
        console.warn("⚠️ Lỗi lấy danh sách sản phẩm:", response.error);
      }
    } catch (error) {
      console.error("[DEBUG] Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.bgrcolor}>
      <View style={styles.container}>
        <Text style={styles.slogan}>
          Powering {"\n"}
          Your Everyday Life!
        </Text>
        <View style={styles.banner}>
          <Image
            style={styles.bannerimg}
            source={require("../../assets/images/banner1.webp")}
          />
        </View>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Newest Arrival
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.newpdcontainer}
          >
            {products.map((item) => (
              <TouchableOpacity
                key={item.idProduct}
                onPress={() =>
                  router.push({
                    pathname: "/home/productdetails",
                    params: { productId: item.idProduct },
                  })
                }
              >
                <Image
                  source={{ uri: `http://10.0.2.2:5000/uploads/${item.ImageName}` }}
                  style={styles.prdimg}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
    width: 180,
    height: 240,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 25,
    resizeMode:'contain',
  },
});
