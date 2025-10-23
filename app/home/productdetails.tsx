import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import apiService from "../apiservices/apiservices";

interface Product {
  idProduct: number;
  ProductName: string;
  ImageName: string;
  SalePrice: number;
  Description: string;
  OriginalPrice: number;
  Stock: number;
  Images?: { idImage: number; ImageLink: string; MainImage: boolean }[];
}

export default function ProductDetails() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // ✅ Lấy chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiService.get<{ data: Product }>(
          `/client/product/list/${productId}`
        );

        const productData = response.data?.data;
        if (productData) {
          setProduct(productData);

          if (productData.Images && productData.Images.length > 0) {
            const main = productData.Images.find((img) => img.MainImage);
            setSelectedImage(
              `http://10.0.2.2:5000/uploads/${
                main ? main.ImageLink : productData.Images[0].ImageLink
              }`
            );
          } else if (productData.ImageName) {
            setSelectedImage(
              `http://10.0.2.2:5000/uploads/${productData.ImageName}`
            );
          } else {
            setSelectedImage(null);
          }
        } else {
          setProduct(null);
          Toast.show({
            type: "error",
            text1: "Không thể tải chi tiết sản phẩm",
            position: "bottom",
          });
        }
      } catch (err) {
        console.log("Lỗi fetch product:", err);
        Toast.show({
          type: "error",
          text1: "Lỗi khi tải sản phẩm",
          position: "bottom",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Giảm / tăng số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.Stock) setQuantity(quantity + 1);
    else
      Toast.show({
        type: "info",
        text1: "Đã đạt số lượng tồn kho tối đa",
        position: "bottom",
      });
  };

  // ✅ Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const res = await apiService.post("/client/cart/addtoCart", {
        productId: product.idProduct,
        quantity,
      });

      Toast.show({
        type: "success",
        text1: "Đã thêm vào giỏ hàng",
        position: "bottom",
        visibilityTime: 1500,
      });

      // Có thể chuyển sang giỏ hàng
      // router.push("/buyandpay/cart");
    } catch (error: any) {
      console.error("Lỗi thêm giỏ hàng:", error);
      Toast.show({
        type: "error",
        text1:
          error.response?.data?.message || "Không thể thêm vào giỏ hàng",
        position: "bottom",
      });
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#F2896C" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loading}>
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  const images =
    product.Images && product.Images.length > 0
      ? product.Images.map(
          (img) => `http://10.0.2.2:5000/uploads/${img.ImageLink}`
        )
      : [`http://10.0.2.2:5000/uploads/${product.ImageName}`];

  return (
    <View style={styles.bgrcolor}>
      <View style={styles.container}>
        <View style={styles.prdimagewrapper}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.prdimage} />
          )}
        </View>

        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image
                source={{ uri: item }}
                style={[
                  styles.thumbnail,
                  selectedImage === item && styles.thumbnailSelected,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView style={styles.prddetails}>
        <View style={styles.content}>
          <Text style={styles.namenprice}>{product.ProductName}</Text>
          <Text style={[styles.namenprice, { color: "#F2896C" }]}>
            {product.SalePrice.toLocaleString()}đ
          </Text>
          <Text style={styles.describe}>{product.Description}</Text>
        </View>
      </ScrollView>

      {/* ✅ Footer thêm giỏ hàng */}
      <View style={styles.footerBar}>
        <View style={styles.quantityWrapper}>
          <TouchableOpacity style={styles.qtyBtn} onPress={decreaseQuantity}>
            <Text style={styles.minusnplus}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={increaseQuantity}>
            <Text style={styles.minusnplus}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
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
    marginHorizontal: 20,
  },
  prdimagewrapper: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  prdimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  thumbnailList: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    gap: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  thumbnailSelected: {
    borderWidth: 2,
    borderColor: "#F2896C",
  },
  prddetails: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#f8f5f5e1",
  },
  content: {
    flex: 1,
    paddingTop: 5,
    padding: 20,
  },
  namenprice: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  describe: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  footerBar: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 50,
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#F2896C",
    justifyContent: "center",
    alignItems: "center",
  },
  minusnplus: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  qtyText: {
    width: 20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  addToCartBtn: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: "#F2896C",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
});
