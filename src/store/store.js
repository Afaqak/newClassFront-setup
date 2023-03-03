import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const middlewares = [logger];

// const config = {
//   key: 'root',
//   storage,
//   whitelist: ['user', 'courses'],
// };
//root reducer
// const persistedReducer = persistReducer(config, rootReducer);

//store

export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

//persistor
// export const persistor = persistStore(store);
