// import { configureStore } from '@reduxjs/toolkit'
// import { userReducer } from './userReducer'

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// })

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
  
export const persistor = persistStore(store)
export default store;