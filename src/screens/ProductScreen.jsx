import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
//import products from '../data/products.json'
import { useEffect, useState } from "react";
import StarsRating from "../components/StarsRating";
import useProductRating from "../hooks/useProductRating"; // Importamos el hook para calcular el rating
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../feactures/cart/cartSlice";
import { useGetProductQuery } from "../services/shopServices";

const ProductDetailScreen = ({ route, navigation }) => {

  const productId = useSelector((state) => state.shopReducer.value.productId);

  const { width, height } = useWindowDimensions();


  const {
    data: productFound,
    error,
    isLoading,
  } = useGetProductQuery(productId);

  console.log("id productfound", productFound);
  const dispatch = useDispatch();

  const [promedioRating, totalResenas] = useProductRating(productId); // Obtenemos el promedio de rating y cantidad de reseñas

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.beigeOscuro} />
      ) : error ? (
        <Text>Error al cargar las categorias</Text>
      ) : (
        <ScrollView
         style={styles.productContainer}
         contentContainerStyle={styles.contentContainer} 
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Text style={styles.textBrand}>{productFound.brand}</Text>
          <Text styles={styles.textTitle}>{productFound.title}</Text>

          <Image
            source={{ uri: productFound.images }}
            alt={productFound.title}
            width="100%"
            height={width * 0.7} // Calcula la altura basada en el ancho
            resizeMode="contain"
          />
          <Text style={styles.longDescription}>
            {" "}
            {productFound.description}
          </Text>

          <View style={styles.tagsContainer}>
            {productFound.discount > 0 && (
              <View style={styles.discount}>
                <Text styles={styles.discountText}>
                  - {productFound.discount} %
                </Text>
              </View>
            )}
          </View>
          {productFound.stock <= 0 && (
            <Text style={styles.noStockText}> Sin Stock</Text>
          )}
          <View>
            <StarsRating rating={promedioRating} />
            <Text>({totalResenas} reseñas)</Text>
          </View>

          <Text style={styles.price}>Precio: ${productFound.price}</Text>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.95 : 1 },
              styles.addToCartButton,
            ]}
            onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}
          >
            <Text style={styles.textAddCToCart}> Agregar al Carrito</Text>
          </Pressable>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.azulMarino,
    marginLeft: -10,
    marginTop: 10,
    marginVertical: 10,
  },
  contentContainer: {
    flexGrow: 1, 
    justifyContent: "center", 
    paddingHorizontal: 20, 
  },
  textBrand: {
    color: colors.azulMarino,
    fontSize: 18,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  tag: {
    flexDirection: "row",
    gap: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    //  marginVertical: 8,
  },
  price: {
    fontWeight: "400",
    fontSize: 10,
    alignSelf: "center",
    paddingVertical: 10,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 12,
  },
  discount: {
    backgroundColor: colors.naranjaBrillante,
    width: 64,
    height: 48,
    padding: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  discountText: {
    color: colors.blanco,
    position: "absolute",
    top: 24,
    textAlign: "center",
    alignItems: "center",
  },
  noStockText: {
    color: "red",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
    paddingVertical: 8,
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.azulMarino,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddCToCart: {
    color: colors.beigeClaro,
    fontSize: 24,
    textAlign: "center",
  },
});
