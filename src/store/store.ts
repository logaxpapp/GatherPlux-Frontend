import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { clientBaseAPISlice } from "@/services/clientBaseAPI";
import { adminBaseAPISlice } from "@/services/adminBaseAPI";
import { currencyApi } from "@/services/currencyAPI";
import usersReducer from "./slices/user.slice";
import eventReducer from "./slices/event.slice";
import categoryReducer from "./slices/category.slice";

const rootReducer = combineReducers({
  [clientBaseAPISlice.reducerPath]: clientBaseAPISlice.reducer,
  [adminBaseAPISlice.reducerPath]: adminBaseAPISlice.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
  user: usersReducer,
  event: eventReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      clientBaseAPISlice.middleware,
      adminBaseAPISlice.middleware,
      currencyApi.middleware,
    ),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
