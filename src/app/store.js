import { configureStore } from "@reduxjs/toolkit";
import shopReducer from '../feactures/shop/shopSlice'
import  { shopApi } from '../services/shopServices'

export const store = configureStore({
        reducer:{
            shopReducer,
            [shopApi.reducerPath] : shopApi.reducer,
        },
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware().concat(shopApi.middleware)

});