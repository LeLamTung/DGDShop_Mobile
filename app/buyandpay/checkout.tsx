import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import apiService from "../apiservices/apiservices";
interface CheckoutInfo {
  CustomerName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  Notes: string;
  PaymentMethod: string | null;
}
export default function Checkout() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Cod", value: "0" },
    { label: "MoMo", value: "1" },
  ]);
  const [form, setForm] = useState<CheckoutInfo>({
    CustomerName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Notes: "",
    PaymentMethod: null,
  });
  const handleCheckout = async () => {
    if (
      form.CustomerName.trim() === "" ||
      form.Email.trim() === "" ||
      form.PhoneNumber.trim() === "" ||
      form.Address.trim() === "" ||
      form.PaymentMethod === null
    ) {
      Toast.show({
        type: "error",
        text1: "Vui lòng điền đầy đủ thông tin",
        position: "bottom",
        visibilityTime: 1500,
        autoHide: true,
      });
      return;
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.Email)) {
      Toast.show({
        type: "error",
        text1: "Email không hợp lệ, vui lòng nhập lại!",
        position: "bottom",
        visibilityTime: 1500,
        autoHide: true,
      });
      return;
    }
    try {
      setLoading(true);
      const res = (await apiService.post("/client/order/Checkout", form)) as {
        data: { data: any[] };
        error?: string;
      };
      if (res.data) {
        Toast.show({
          type: "success",
          text1: "Đặt hàng thành công",
          position: "bottom",
          visibilityTime: 1500,
          autoHide: true,
        });
        router.push("../home/homescreens");
      } else {
        Toast.show({
          type: "error",
          text1: res.error || "Có lỗi khi đặt hàng",
          position: "bottom",
          visibilityTime: 1500,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log("Checkout error:", error);
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra",
        position: "bottom",
        visibilityTime: 1500,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerwrapper}>
        <Text style={styles.headertitle}>Checkout</Text>
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Họ và tên</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.CustomerName}
          onChangeText={(text) => setForm({ ...form, CustomerName: text })}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Email</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.Email}
          onChangeText={(text) => setForm({ ...form, Email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Số điện thoại</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.PhoneNumber}
          onChangeText={(text) => setForm({ ...form, PhoneNumber: text })}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Địa chỉ</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.Address}
          onChangeText={(text) => setForm({ ...form, Address: text })}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.inputbgr}>
        <Text style={styles.inputlabel}>Ghi chú(Nếu có)</Text>
        <TextInput
          style={{ borderBottomWidth: 0.5 }}
          value={form.Notes}
          onChangeText={(text) => setForm({ ...form, Notes: text })}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.pickerbgr}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={(val) => setForm({ ...form, PaymentMethod: val })}
          setItems={setItems}
          placeholder="Chọn phương thức thanh toán"
          style={{
            borderColor: "#ccc",
            borderRadius: 10,
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
          }}
          labelStyle={{
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
          }}
        />
      </View>
      <View style={styles.footerBar}>
        <TouchableOpacity style={styles.checkoutbtn} onPress={handleCheckout}>
          <Text style={styles.checkouttext}>Checkout</Text>
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
  inputbgr: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 10,
    elevation: 2,
    borderRadius: 10,
  },
  inputlabel: {
    color: "#555",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  pickerbgr: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    elevation: 2,
    borderRadius: 10,
  },
  footerBar: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: 40,
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
});
