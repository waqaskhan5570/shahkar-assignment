import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../store/reducers/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});
