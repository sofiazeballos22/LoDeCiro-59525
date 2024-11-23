import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen"
import Header from "../components/Header";


const Stack = createNativeStackNavigator();

const MyPlacesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => (
          <Header title="Lo de Ciro" subtitle={route.name} />
        ),
      }}
    >
      <Stack.Screen name="Esperamos tu visita" component={MyPlacesScreen} />
    </Stack.Navigator>
  );
};

export default MyPlacesNavigation;

const styles = StyleSheet.create({});
