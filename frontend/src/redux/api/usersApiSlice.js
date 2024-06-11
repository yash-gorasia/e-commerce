import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';   
import { logout } from '../features/auth/authSlice';
import Register from '../../pages/Auth/Register';

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

        register: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: credentials,
            }),
        }),

        profile: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: "PUT",
              body: data,
            }),
          }),

    }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = userApiSlice;