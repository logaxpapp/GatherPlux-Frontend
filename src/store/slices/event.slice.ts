import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  event: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      return {
        ...state,
        events: action.payload,
      };
    },
    setEvent: (state, action) => {
      return {
        ...state,
        event: action.payload,
      };
    },
  },
});

export const { setEvents, setEvent } = eventSlice.actions;

export default eventSlice.reducer;