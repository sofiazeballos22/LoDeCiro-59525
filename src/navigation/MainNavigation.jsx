import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigation";
import AuthNavigator from "./AuthNavigation";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  // const [user, setUser] = useState("")
  const user = useSelector((state) => state.authReducer.value.email);
  console.log(user);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigation;
