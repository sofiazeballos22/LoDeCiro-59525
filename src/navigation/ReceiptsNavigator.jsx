import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReceiptsScreen from "../screens/ReceiptsScreen" 


const ReceiptStack = createNativeStackNavigator ()

const ReceiptsNavigator = () => {
  return (
    <ReceiptStack.Navigator>
        <ReceiptStack.Screen component={ReceiptsScreen} name = "Recibos" />
    </ReceiptStack.Navigator>
  )
}

export default ReceiptsNavigator

const styles = StyleSheet.create({})