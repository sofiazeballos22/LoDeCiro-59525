import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from "../screens/CartScreen.jsx"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen component={CartScreen} name = "Carrito"/>
        </CartStack.Navigator>
    )
}

const styles = StyleSheet.create({})