import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      header: ({ route }) => (
        <Header title="Lo de Ciro" subtitle={route.name} />
      ),
    }}
  >
    <Stack.Screen name="Perfil" component={ProfileScreen} />
  </Stack.Navigator>
);

export default ProfileNavigation;
