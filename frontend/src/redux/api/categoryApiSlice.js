import { apiSlice } from './apiSlice';
import { CATEGORY_URL } from '../constants';

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}/`,
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Category'],
        }),

        updateCategory: builder.mutation({
            query: (categoryId, updatedCategory) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: ['Category'],
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),

        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
            }),
            providesTags: ['Category'],
            keepUnusedDataFor: 5,
        }),

        readCategoryById: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
            }),
            providesTags: ['Category'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useReadCategoryByIdQuery } = categoryApiSlice;
