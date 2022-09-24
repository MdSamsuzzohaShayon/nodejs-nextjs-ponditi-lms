import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import indexReducer from './reducers/indexReducer';
import elementReducer from './reducers/elementsSlice'
import adminReducer from './reducers/adminReducer';
import classtypeReducer from './reducers/classtypeReducer';
import subjectReducer from './reducers/subjectReducer';

const store = configureStore({
  reducer: {
    index: indexReducer,
    user: userReducer,
    elements: elementReducer,
    admin: adminReducer,
    classtype: classtypeReducer,
    subject: subjectReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   })
});

export default store;
