import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../feactures/shop/shopSlice";
import { useGetCategoriesQuery } from "../services/shopServices";
import { useState, useEffect } from "react";

const CategoriesScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(true);

  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (width > height) {
      setIsPortrait(false);
    } else {
      setIsPortrait(true);
    }
  }, [width, height]);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setCategory(item.title));
          navigation.navigate("Productos");
        }}
      >
        <FlatCard
          style={
            // Operador ternario:?... Si verdadero: si falso
            index % 2 == 0
              ? { ...styles.categoryItemContainer, ...styles.row }
              : { ...styles.categoryItemContainer, ...styles.rowReverse }
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.azulMarino} />
        ) : error ? (
          <Text> Error al cargar las categorias </Text>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
          />
        )}
      </View>
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryItemContainer: {
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 8,
    width: "95%",
    height: 140,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.naranjaPastel,
    padding: 10,
  },
  image: {
    height: 100,
    width: 120,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
