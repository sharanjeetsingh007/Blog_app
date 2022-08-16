import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userLogin, reCallReducer } from './reducers';
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
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'persist-key',
    storage,
};

// const persistedReducer = persistReducer(persistConfig, userLogin)

const reducers = combineReducers({ userLogin: userLogin });
const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: {
        reCall: reCallReducer,
        reducer: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })

})
