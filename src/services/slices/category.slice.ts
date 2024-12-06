import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => 'base/category',
    }),

  }),
  overrideExisting: false,
});

export const { useGetAllCategoriesQuery } = extendApiSlice;