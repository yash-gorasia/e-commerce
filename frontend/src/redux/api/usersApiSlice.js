import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';   
import { logout } from '../features/auth/authSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       login: builder.mutation({
           query: (credentials) => ({
               url: `${USERS_URL}/auth`,
               method: 'POST',
               body: credentials,
           }),
        }),

        logout : builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
            onQueryStarted: () => {
                logout();
            },
        }),
    }),
})

export const { useLoginMutation, useLogoutMutation } = userApiSlice;