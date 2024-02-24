import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   persistStore,
   persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

const persistConfig = {
   key: 'root',
   storage,
};

const rootReducer = combineReducers({
   contacts: contactsReducer,
   filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      });
   },
});

export const persistor = persistStore(store);
