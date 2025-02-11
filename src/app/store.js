import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './feature/userApi/userApi'
import  userReducer  from './feature/userApi/userSlices'
import { complaintApi } from './feature/complaintApi/complaintApi'

export const store = configureStore({
  reducer: {

    // Add the generated reducer as a specific top-level slice
    user : userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [complaintApi.reducerPath]: complaintApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,complaintApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)