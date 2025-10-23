import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import apiService from "../apiservices/apiservices"; // import api service
interface CategoryType {
  id: string;
  name: string;
}
interface Product {
  idProduct: number;
  ProductName: string;
  ImageName: string;
  OriginalPrice: number;
  SalePrice: number;
  SalePercentage: number;
  Description: string;
  IsSales: boolean;
  IsHome: boolean;
  Category: {
    idCategory: number;
    CategoryName: string;
    CategoryImage: string;
  };
}
export default function Category() {
  const bgrcolorfocused = "#F2896C";
  const bgrcolorunfocused = "white";
  const textcolorfocused = "white";
  const textcolorunfocused = "black";

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    { id: "all", name: "All" },
  ]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiService.get<{ cod: number; data: Product[] }>(
          "/client/product/list"
        );
        if (res.data?.data) {
          const allProducts = res.data.data;
          setProducts(allProducts);
          setFilteredProducts(allProducts);

          // lấy unique categories từ product
          const uniqueCategories: CategoryType[] = [
            { id: "all", name: "All" },
            ...Array.from(
              new Map<number, CategoryType>(
                allProducts.map((p) => [
                  p.Category.idCategory,
                  {
                    id: p.Category.idCategory.toString(),
                    name: p.Category.CategoryName,
                  },
                ])
              ).values()
            ),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.log("Fetch products error:", err);
      }
    };
    fetchProducts();
  }, []);

  // chọn category
  const handleSelectCategory = (index: number, categoryId: string) => {
    setFocusedIndex(index);
    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.Category.idCategory.toString() === categoryId)
      );
    }
  };
  // xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredProducts(products);
    } else {
      const lowerText = text.toLowerCase();
      setFilteredProducts(
        products.filter((p) => p.ProductName.toLowerCase().includes(lowerText))
      );
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
    <View style={styles.bgrcolor}>
      <View style={styles.container}>
        {/* Ô tìm kiếm */}
        <View style={styles.searcharea}>
          <Ionicons name="search-outline" size={30} color="black" />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search Products"
            placeholderTextColor={"lightgrey"}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Category List bằng FlatList */}
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categorylist}
          renderItem={({ item, index }) => {
            const isFocused = focusedIndex === index;
            return (
              <TouchableOpacity
                onPress={() => handleSelectCategory(index, item.id)}
                style={[
                  styles.catewrapper,
                  {
                    backgroundColor: isFocused
                      ? bgrcolorfocused
                      : bgrcolorunfocused,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.catename,
                    {
                      color: isFocused ? textcolorfocused : textcolorunfocused,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.idProduct.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={styles.prdlist}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.prdwrapper}
            onPress={() =>
              router.push({
                pathname: "/home/productdetails",
                params: { productId: item.idProduct },
              })
            }
          >
            <ImageBackground
              source={{
                uri: `http://10.0.2.2:5000/uploads/${item.ImageName}`,
              }}
              style={styles.prdimg}
              imageStyle={{ borderRadius: 10 }}
            />
            <View style={styles.overlay}>
              <Text style={styles.prdname} numberOfLines={2} ellipsizeMode="tail">
                {/* {item.ProductName.length > 10
                  ? item.ProductName.substring(0, 10) + "..."
                  : item.ProductName} */}
                {item.ProductName}
              </Text>
              <Text style={styles.prdprice}>
                {item.SalePrice.toLocaleString("vi-VN")}₫
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  searcharea: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 25,
    padding: 8,
    alignItems: "center",
    elevation: 3,
  },
  categorylist: {
    marginVertical: 20,
    height: 50,
  },
  catewrapper: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    minWidth: 60,
    elevation: 3,
    marginRight: 16,
  },
  catename: {
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  prdlist: {
    marginHorizontal: 5,
  },
  prdwrapper: {
    flex: 1,
    width: "100%",
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    margin: 12,
  },
  prdimg: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 3,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  prdname: {
    marginTop: 2,
    color: "#000000ff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  prdprice: {
    color: "#F2896C",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
