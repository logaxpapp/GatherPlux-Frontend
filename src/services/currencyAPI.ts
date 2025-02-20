import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for the API response
interface Currency {
  code: string;
  name: string;
}

interface Country {
  currencies: { [code: string]: { name?: string } };
  name: { common: string };
}

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], void>({
      query: () => "/all?fields=currencies,name",
      transformResponse: (data: Country[]) => {
        const currencySet = new Set<string>();
        const uniqueCurrencies: Currency[] = [];

        data.forEach((country: Country) => {
          if (country.currencies) {
            Object.keys(country.currencies).forEach((currencyCode) => {
              if (!currencySet.has(currencyCode)) {
                currencySet.add(currencyCode);
                uniqueCurrencies.push({
                  code: currencyCode,
                  name: country.currencies[currencyCode].name || currencyCode,
                });
              }
            });
          }
        });

        uniqueCurrencies.sort((a, b) => {
          const codeA = a.code.toUpperCase();
          const codeB = b.code.toUpperCase();
          if (codeA < codeB) {
            return -1;
          }
          if (codeA > codeB) {
            return 1;
          }
          return 0; // Codes are equal
        });

        return uniqueCurrencies;
      },
    }),
  }),
});

export const { useGetCurrenciesQuery } = currencyApi;
