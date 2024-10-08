import { Action, configureStore } from "@reduxjs/toolkit";
import { AuthState, authReducer } from "./Auth/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "./webStorage";
import { activeUsersReducer } from "./Users/slice";
import { nonAuthReducer } from "./Unregistred/slice";



const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token'],
};



export const store = configureStore({

  reducer: {
    auth: persistReducer<AuthState, Action>(authPersistConfig, authReducer),
    users: activeUsersReducer,
    nonauth: nonAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;