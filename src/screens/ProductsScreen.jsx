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
   

    const dispatch = useDispatch()
    useEffect(() => {
        if (productsFilteredByCategory) {
            const filtered = search
                ? productsFilteredByCategory.filter(product =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                )
                : productsFilteredByCategory;
            setProductsFiltered(filtered);
        }
    }, [search, productsFilteredByCategory]);





    const renderProductItem = ({ item }) => {
        

        const [promedioRating, totalReviews] = useProductRating(item.id);
        const tagsArray = typeof item.tags === 'string' ? [item.tags] : item.tags;
      

        return (
            <Pressable onPress={() => {
                dispatch(setProductId(item.id))
                navigation.navigate("Producto")
            }}>
                <FlatCard style={styles.productsContainer}>
                    <View> 
                        <Image
                            source={{ uri: item.images }}
                            style={ styles.productImage }
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.productDescription}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        
                            <View>      
                                <StarsRating rating={promedioRating} /> 
                                <Text style={styles.styleReview}
                                >({totalReviews} reseñas) </Text>                   
                            </View>
                 
                        {item.discountPercentage > 0 && 
                            <View style={styles.discount}>
                                <Text> Descuento: {item.discountPercentage} % </Text>
                            </View>
                        }
                        {item.stock <= 0 && 
                            <Text> Stock: {item.noStockText} Sin Stock </Text>
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
                        <Icon style={styles.goBack} name='arrow-back-ios' size={24} /> 
                    </Pressable>
                    <Search style={styles.searchStyle}
                        setSearch={setSearch}
                    />
                    <FlatList   
                        data={productsFiltered}
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
    productsContainer: {
        flexDirection: "row",
        padding: 17,
        justifyContent: "flex-start",
        gap: 30,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        height: 220,
        borderRadius: 50,
    }, 
    productImage: {
        width: 100,
        height: 120,
        resizeMode: "cover",
    },
    productDescription: {
        width: "70%",
        padding: 20,
        gap: 10,
    },
    productTitle: {
        fontFamily: 'Henny',
        fontWeight: '700',
        fontSize: 20,
        color: colors.naranjaPastel,
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
    styleReview: {
        color: colors.beigeClaro
    },
   
    price: {
        fontWeight: '600',
        fontSize: 20,   
        color: colors.beigeClaro
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
        padding: 8,
        marginLeft: 7,
        color: colors.azulMarino,
        marginTop: -6,
        marginBottom: 5,
        
    },
    



    
})