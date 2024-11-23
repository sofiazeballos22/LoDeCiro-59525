import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigation from "./ShopNavigation";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReceiptsNavigator from "../navigation/ReceiptsNavigator";
import CartNavigator from "../navigation/CartNavigation";
import ProfileNavigation from "./ProfileNavigation";
import MyPlacesNavigator from "./MyPlacesNavigation";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="storefront"
              size={32}
              color={focused ? colors.beigeOscuro : colors.naranjaPastel}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              size={32}
              color={focused ? colors.beigeOscuro : colors.naranjaPastel}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={ReceiptsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="receipt"
              size={32}
              color={focused ? colors.beigeOscuro : colors.naranjaPastel}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-circle"
              size={32}
              color={focused ? colors.beigeOscuro : colors.naranjaPastel}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Places"
        component={MyPlacesNavigator} 
        options={{
        tabBarIcon: ({focused})=>(<Icon name="location-on" size={32} color={focused?colors.beigeOscuro : colors.naranjaPastel} />)
        }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: colors.azulMarino,
  },
});
