import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { base_url } from "../firebase/dataBase"

export const shopApi = createApi ({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories:builder.query({
            query: () => 'categories.json'
        }),
        getProducts:builder.query({
            query: () => 'products.json'
        }),
        getProductsByCategory:builder.query({
            query: (category) => {
                category = category.ToLowerCase()
                return (
                `products.json?orderBy="category&equalTo="${category}"`
                )
            },
            transformErrorResponse: (response) => (
                response ? Object.values(response) : []
            )
        }),
        getProduct: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => (
                response ? Object.values(response)[0] : null
            )
        })
    }),
})

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery } = shopApi