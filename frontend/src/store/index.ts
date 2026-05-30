import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import propertyReducer from './propertySlice';
import bookingReducer from './bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
