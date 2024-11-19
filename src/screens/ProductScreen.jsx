import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors"
import products from "../screens/ProductsScreen"


const ProductScreen = ({ route }) => {

    const [ productFound, setProductFound ] = useState({})
    const productId = route.params

    useEffect(() => {
        setProductFound(products.find(product => product.id === productId))
    },[productId])
  return (
    <View>
      <Pressable onPress={() => setProductId(null)}> <Icon style={styles.goBack}  size={24} /></Pressable>
      <Text>{productFound.title}</Text>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    goBack: {
        padding: 20,
        color: colors.celestePastel
    }
})