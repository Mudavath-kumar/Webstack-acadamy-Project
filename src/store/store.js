import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import firebaseAuthReducer from './slices/firebaseAuthSlice';
import propertyReducer from './slices/propertySlice';
import bookingReducer from './slices/bookingSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firebaseAuth: firebaseAuthReducer,
    property: propertyReducer,
    booking: bookingReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
