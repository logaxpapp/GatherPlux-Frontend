import { clientBaseAPISlice } from "../clientBaseAPI";

const extendApiSlice = clientBaseAPISlice.injectEndpoints({
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