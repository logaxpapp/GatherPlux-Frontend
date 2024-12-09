import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApiSlice } from '@/services';
import usersReducer from './slices/user.slice';
import eventReducer from './slices/event.slice';
import categoryReducer from './slices/category.slice';

const rootReducer = combineReducers({
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  user: usersReducer,
  event: eventReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApiSlice.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;