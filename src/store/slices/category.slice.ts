import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
};

const categorySlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    setCategory: (state, action) => {
      return {
        ...state,
        category: action.payload,
      };
    },
  },
});

export const { setCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;