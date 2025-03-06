import { createSlice } from "@reduxjs/toolkit";

interface EventState {
  events: [];
  newEvent: {
    id: string;
    title: string;
    description: string;
    city: string;
    address: string;
    category_id: string;
    state_id: string;
    images: string;
    sessions: {
      id: string;
      name?: string;
      date: Date;
      start_time: string;
      end_time: string;
    }[];
    number_of_tickets: number;
    currency: string;
    tickets: {
      id: string;
      name: string;
      price: string;
      no_per_seat_type: number;
      seat_type: string;
      quantity: number;
    }[];
    each_ticket_identity: boolean;
    hideTickets: boolean;
    event_type: string;
    is_free: boolean;
  }[];
  eventToEdit: {
    id: string;
    title: string;
    description: string;
    city: string;
    address: string;
    category_id: string;
    state_id: string;
    images: string[];
    country: string;
    sessions: {
      id: string;
      name?: string;
      date: Date;
      start_time: string;
      end_time: string;
    }[];
    number_of_tickets: number;
    currency: string;
    tickets: {
      id: string;
      name: string;
      price: string;
      no_per_seat_type: number;
      seat_type: string;
      quantity: number;
    }[];
    each_ticket_identity: boolean;
    event_type: string;
    is_free: boolean;
  };
  editedEvent: {
    id: string;
    title: string;
    description: string;
    city: string;
    address: string;
    category_id: string;
    state_id: string;
    images: string[];
    country: string;
    sessions: {
      id: string;
      name?: string;
      date: Date;
      start_time: string;
      end_time: string;
    }[];
    number_of_tickets: number;
    currency: string;
    tickets: {
      id: string;
      name: string;
      price: string;
      no_per_seat_type: number;
      seat_type: string;
      quantity: number;
    }[];
    each_ticket_identity: boolean;
    event_type: string;
    is_free: boolean;
  }[];
}

const initialState: EventState = {
  events: [],
  newEvent: [],
  eventToEdit: {
    id: "",
    title: "",
    description: "",
    city: "",
    address: "",
    category_id: "",
    state_id: "",
    images: [],
    country: "",
    sessions: [],
    number_of_tickets: 0,
    currency: "",
    tickets: [],
    each_ticket_identity: false,
    event_type: "",
    is_free: false,
  },
  editedEvent: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addNewEventFields: (state, action) => {
      state.newEvent = [...state.newEvent, action.payload];
    },
    updateEventToEdit: (state, action) => {
      state.eventToEdit = action.payload;
    },
    updateEditedEvent: (state, action) => {
      state.editedEvent = [...state.editedEvent, action.payload];
    },
  },
});

export const {
  setEvents,
  addNewEventFields,
  updateEventToEdit,
  updateEditedEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
