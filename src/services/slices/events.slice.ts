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
    getOneEvent: builder.query({
      query: (id) => `event/${id}`,
    }),
    getUpcomingEvents: builder.query({
      query: () => 'event?type=upcoming',
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllPublicEventsQuery, useCreateEventMutation, useGetOneEventQuery, useGetUpcomingEventsQuery } = extendApiSlice;