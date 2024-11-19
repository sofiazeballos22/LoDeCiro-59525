// Screen: Cada pantalla que se ve en mi celular.

import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator } from 'react-native'
// import categories from "../data/categories.json"
import StarsRating from '../components/StarsRating'
import useProductRating from '../hooks/useProductRating'
import FlatCard from "../components/FlatCard"
import { colors } from "../global/colors"
import Icon from "react-native-vector-icons/MaterialIcons"
import  Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopServices'
import { setProductId } from '../feactures/shop/shopSlice'
import { useEffect, useState } from 'react'

const ProductsScreen = ({  navigation, route }) => {

    const [ productsFiltered, setProductsFiltered ] = useState([])
    const [ search, setSearch ] = useState("")

    const category = useSelector(state=>state.shopReducer.value.categorySelected)
    
    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)
    dispatch = useDispatch()

    const renderProductItem = ({ item }) => {
        const [promedioRating, totalReviews] = useProductRating(item.id);
        return (
            <Pressable onPress={() => {
                dispatch(setProductId(item.id))
                navigation.navigate("Producto")
            }}>
                <FlatCard style={styles.productContainer}>
                    <View> 
                        <Image
                            source={{ uri: item.images }}
                            style={ styles.productImage }
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.productDescription}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.tags}>
                            <Text style={styles.tagText}> Tags : </Text>
                            {
                                <FlatList 
                                    style={styles.tags}
                                    data={item.tags}
                                    keyExtractor={()=> Math.random (Date.now())}
                                    renderItem={({ item }) => (<Text style={styles.tagText}> {item} </Text>)} 
                                />
                            }
                            <View>      
                                <StarsRating rating = {promedioRating} /> 
                                <Text>({totalReviews} reseñas) </Text>                   
                            </View>
                                                  
                        </View>    
                        {
                            item.discountPercentage >0 && <View style={styles.discount}>  <Text> Descuento: {item.discountPercentage} % </Text></View>
                        }
                        {
                            item.stock <=0 && <Text> Stock: {item.noStockText} Sin Stock </Text>
                        }
                        <Text style={styles.price}> Precio: $ {item.price}</Text>
                    </View>
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <>
            {
                isLoading
                ?
                <ActivityIndicator size="large" color={colors.verdePastel} />
                :
                error
                ?
                <Text>Error al cargar las categorías</Text>
                :
                <>
                    <Pressable onPress={() => navigation.goBack()}> 
                        <Icon style={styles.    goBack} name='arrow-back-ios' size={24} /> 
                    </Pressable>
                    <FlatList   
                        data={productsFilteredByCategory}
                        keyExtractor={item=> item.id}
                        renderItem={renderProductItem}

                    />
                </>                                   
            }
        </>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        padding: 22,
        justifyContent: "flex-start",
        gap: 18,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productDescription: {
        width: "70%",
        padding: 20,
        gap: 15,
    },
    productTitle: {
        fontFamily: 'Henny',
        fontWeight: '700',
        fontSize: 50,
    },
    fixed: {
        width: 100,
        height: 100, 
        backgroundColor: colors.celesteVivo,
        position: 'absolute',
        zIndex: 999,
        bottom: 100,
        left: 40
    },
    tags: {
        flexDirection: 'row',
        gap: 5
    },
    tagText: {
        fontWeight: '600',
        fontSize: 10,
        color: colors.naranjaPastel,
    },
    price: {
        fontWeight: '600',
        fontSize: 20
    },
    discount: {
        backgroundColor: colors.celesteVivo,
        padding: 8,
        borderRadius: 15,
        alignSelf: 'flex-start'
    },
    discountText: {
        color: colors.beigeOscuro,
    },
    noStockText: {
        color: 'red',
    },
    goBack: {
        padding: 10,
    }



    
})