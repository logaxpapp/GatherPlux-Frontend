import { adminBaseAPISlice } from "../adminBaseAPI";

const extendApiSlice = adminBaseAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (page) => `user?page=${page}&size=10&role=user&sortBy=id&sortDirection=desc`,
    }),
    getAllAdmins: builder.query({
      query: (page) => `user?page=${page}&size=20&role=admin&sortBy=id&sortDirection=desc`,
    }),
    createAdmin: builder.mutation({
      query: (adminDetails) => ({
        url: 'user',
        method: 'POST',
        body: adminDetails,
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllAdminCountry: builder.query({
      query: (page) => `base/country?page=${page}&size=10&sortDirection=asc`,
    }),
    getAllAdminCategories: builder.query({
      query: () => 'base/category',
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useGetAllAdminsQuery, useCreateAdminMutation, useDeleteAdminMutation, useGetAllAdminCountryQuery, useGetAllAdminCategoriesQuery } = extendApiSlice;