import { clientBaseAPISlice } from "../clientBaseAPI";

const extendApiSlice = clientBaseAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "base/category",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCategoriesQuery, useLazyGetAllCategoriesQuery } =
  extendApiSlice;
