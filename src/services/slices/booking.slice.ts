import { clientBaseAPISlice } from "../clientBaseAPI";

const extendApiSlice = clientBaseAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBookings: builder.query({
      query: () => ({
        url: "event/booking/me",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserBookingsQuery } = extendApiSlice;
