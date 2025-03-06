import { clientBaseAPISlice } from "../clientBaseAPI";

const extendApiSlice = clientBaseAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPublicEvents: builder.query({
      query: (page = 0) => `event/list?page=${page}&size=10`,
    }),
    createEvent: builder.mutation({
      query: (eventDetails) => ({
        url: "event",
        method: "POST",
        body: eventDetails,
      }),
    }),
    getOneEvent: builder.query({
      query: (id) => `event/${id}`,
    }),
    getUpcomingEvents: builder.query({
      query: () => "event?type=UPCOMING",
    }),
    getSearchedEvents: builder.query({
      query: (query) => `event?search=${query}`,
    }),
    searchEvents: builder.query({
      query: ({ query, page }) =>
        `event?search=${query}&page=${page}&size=10&sortDirection=desc`,
    }),
    bookEvent: builder.mutation({
      query: (eventDetails) => ({
        url: "event/booking",
        method: "POST",
        body: eventDetails,
      }),
    }),
    getUserEvents: builder.query({
      query: () => "event/me",
    }),
    updateEvent: builder.mutation({
      query: ({ id, updatedEvent }) => ({
        url: `event/${id}`,
        method: "PUT",
        body: updatedEvent,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPublicEventsQuery,
  useCreateEventMutation,
  useGetOneEventQuery,
  useLazyGetOneEventQuery,
  useGetUpcomingEventsQuery,
  useGetSearchedEventsQuery,
  useLazySearchEventsQuery,
  useBookEventMutation,
  useGetUserEventsQuery,
  useUpdateEventMutation,
} = extendApiSlice;
