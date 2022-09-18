import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import indexReducer from './reducers/indexReducer';
import elementReducer from './reducers/elementsSlice'

const store = configureStore({
  reducer: {
    index: indexReducer,
    user: userReducer,
    elements: elementReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   })
});

export default store;
