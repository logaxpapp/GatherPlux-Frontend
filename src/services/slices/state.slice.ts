import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStates: builder.query({
      query: (countryCode) => `base/country/state/${countryCode}`,
    }),

  }),
  overrideExisting: false,
});

export const { useGetAllStatesQuery } = extendApiSlice;