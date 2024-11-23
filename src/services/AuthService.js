import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import { base_auth_url, api_key } from '../firebase/database'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://identitytoolkit.googleapis.com/v1/"  }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: ({ ...auth }) => {
                const signupUrl = `accounts:signUp?key=${process.env.EXPO_PUBLIC_API_KEY}`;
                console.log('Signup URL:', signupUrl);  // Aquí es donde agregas el console.log
                return {
                    url: signupUrl,
                    method: 'POST',
                    body: auth
                };
            }
        }),
        login: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signInWithPassword?key=${process.env.EXPO_PUBLIC_API_KEY}`,
                method: 'POST',
                body: auth
            })
        })
    })
})

export const { useSignupMutation, useLoginMutation } = authApi