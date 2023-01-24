import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import indexReducer from './reducers/indexReducer';
import elementReducer from './reducers/elementsSlice';
import adminReducer from './reducers/adminReducer';
import tuitionmReducer from './reducers/tuitionmReducer';
import classtypeReducer from './reducers/classtypeReducer';
import subjectReducer from './reducers/subjectReducer';
import searchReducer from './reducers/searchReducer';
import scheduledclassReducer from './reducers/scheduledclassReducer';
import educationReducer from './reducers/educationReducer';

const store = configureStore({
  reducer: {
    index: indexReducer,
    user: userReducer,
    elements: elementReducer,
    admin: adminReducer,
    tuitionm: tuitionmReducer,
    classtype: classtypeReducer,
    subject: subjectReducer,
    search: searchReducer,
    scheduledclass: scheduledclassReducer,
    education: educationReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   })
});

export default store;
