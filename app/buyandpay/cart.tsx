import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import apiService from "../apiservices/apiservices";
interface CartItem {
  idCart: number;
  productId: number;
  ProductName: string;
  ImageName: string;
  CategoryName: string;
  SalePrice: number;
  quantity: number;
  TotalPrice: number;
}
interface ApiListResponse<T> {
  cod: number;
  data: T[];
}
export default function Cart() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setquantity] = useState(1);
  const router = useRouter();
  useEffect(() => {
    fetchCartItems();
  },[]);
  const fetchCartItems = async () => {
      try {
        const res = await apiService.get<ApiListResponse<CartItem>>(
          "/client/cart/ListItem"
        );

        if (res.data) {
          setCartItems(res.data.data);
        } else {
          Toast.show({
            type: "error",
            text1: "Lỗi khi tải giỏ hàng",
            position: "bottom",
            visibilityTime: 1500,
            autoHide: true,
          });
          // Alert.alert("Lỗi", "Lỗi khi tải giỏ hàng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        Toast.show({
          type: "error",
          text1: "Không thể kết nối đến máy chủ",
          position: "bottom",
        });
      } finally {
        setLoading(false);
      }
      // Alert.alert("Lỗi", "Lỗi khi tải giỏ hàng");
    };
  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const res = await apiService.put("/client/cart/updateQuantity", {
        productId,
        quantity: newQuantity,
      })as { data: { data: any[] } };

      Toast.show({
        type: "success",
        text1: "Cập nhật số lượng thành công",
        position: "bottom",
        visibilityTime: 1500,
      });

      setCartItems(res.data.data); // Backend trả về giỏ mới
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1:
          error.response?.data?.message || "Không thể cập nhật số lượng",
        position: "bottom",
      });
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await apiService.delete(`/client/cart/remove/${productId}`);
      Toast.show({
        type: "success",
        text1: "Đã xóa sản phẩm khỏi giỏ hàng",
        position: "bottom",
        visibilityTime: 1500,
      });
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      Toast.show({
        type: "error",
        text1: "Không thể xóa sản phẩm",
        position: "bottom",
      });
    }
  };
  const handlecheckout = () => {
    router.push("../buyandpay/checkout");
  }
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#F2896C" />
        <Text style={{ marginTop: 10 }}>Đang tải giỏ hàng...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerwrapper}>
        <Text style={styles.headertitle}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={60} color="#ccc" />
          <Text style={{ fontFamily: "Poppins_400Regular", marginTop: 10 }}>
            Giỏ hàng trống
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.idCart.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.prdwrapper}>
              <View style={styles.imgwrapper}>
                <Image
                  source={{ uri:`http://10.0.2.2:5000/uploads/${item.ImageName}` }}
                  style={styles.prdimg}
                />
              </View>
              <View style={styles.prddetail}>
                <Text style={styles.prdname}>{item.ProductName}</Text>
                <Text style={styles.prdprice}>
                  {item.SalePrice.toLocaleString()}đ
                </Text>
                <Text style={{ fontSize: 12, color: "#555" }}>
                  {item.CategoryName}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.quantityWrapper}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => {
                      if (item.quantity > 1)
                        updateQuantity(item.productId, item.quantity - 1);
                    }}
                  >
                    <Text style={styles.minusnplus}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    <Text style={styles.minusnplus}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cartrmv} onPress={()=>removeItem(item.productId)}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.footerBar}>
          <View style={styles.totalm}>
            <Text style={styles.totaltext}>Total Amount:</Text>
            <Text style={[styles.totaltext, { color: "#F2896C" }]}>
              {cartItems
                .reduce((sum, item) => sum + item.TotalPrice, 0)
                .toLocaleString()}
              đ
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutbtn} onPress={handlecheckout}>
            <Text style={styles.checkouttext}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
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
  headerwrapper: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headertitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 30,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  prdwrapper: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderBottomWidth: 0.6,
    padding: 10,
    paddingLeft: 0,
  },
  imgwrapper: {
    width: 80,
    height: 84,
  },
  prdimg: {
    width: "100%", // bo full theo wrapper
    height: "100%",
    resizeMode: "cover",
  },
  prddetail: {
    marginLeft: 10,
    width: 220,
  },
  prdname: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  prdprice: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#F2896C",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#F2896C",
    justifyContent: "center",
    alignItems: "center",
  },
  minusnplus: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  qtyText: {
    width: 14,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
  },
  cartrmv: {
    marginTop: 4,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2896C",
    borderRadius: 10,
  },
  footerBar: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: 30,
    borderTopWidth: 0.6,
    width: 370,
  },
  checkoutbtn: {
    flex: 1,
    backgroundColor: "#F2896C",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    width: "100%",
  },
  checkouttext: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  totalm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
  },
  totaltext: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
});
