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

        logout: builder.mutation({
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

        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        })
    }),
})

export const { useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation } = userApiSlice;