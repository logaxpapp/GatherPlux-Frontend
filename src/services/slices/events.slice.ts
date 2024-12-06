import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPublicEvents: builder.query({
      query: () => 'event/list',
    }),
    createEvent: builder.mutation({
      query: (eventDetails) => ({
        url: 'event',
        method: 'POST',
        body: eventDetails,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllPublicEventsQuery, useCreateEventMutation } = extendApiSlice;