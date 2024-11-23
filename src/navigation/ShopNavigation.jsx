import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import {
  CategoriesScreen,
  ProductScreen,
  ProductsScreen,
} from "../screens/index";

const Stack = createNativeStackNavigator();

const ShopNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />,
      }}
    >
      <Stack.Screen name="Categorias" component={CategoriesScreen} />
      <Stack.Screen name="Productos" component={ProductsScreen} />
      <Stack.Screen name="Producto" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ShopNavigation;
