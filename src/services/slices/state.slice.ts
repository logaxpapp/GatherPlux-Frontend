import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStates: builder.query({
      query: (countryCode) => `base/country/state/${countryCode}`,
    }),
    getAllCountries: builder.query({
      query: () => 'base/country',
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAllStatesQuery, useGetAllCountriesQuery } = extendApiSlice;