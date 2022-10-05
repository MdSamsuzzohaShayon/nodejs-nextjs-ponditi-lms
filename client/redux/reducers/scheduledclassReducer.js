/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';
import { scheduledclassStatus } from '../../config/keys';
import { fetchAllClassTypes } from './classtypeReducer';
import { fetchAllSubjects } from './subjectReducer';
import { resetAuthUserInfo } from './userReducer';

const { APPROVED, PENDING, REJECTED } = scheduledclassStatus;

const initicalAddScheduledClass = {
  name: '',
  subjectId: '',
};

const iscHours = 1;
const iscStart = new Date().toISOString();
const initialAScheduledClass = {
  receverId: 2,
  ClassTypeId: 3,
  SubjectId: 1,
  desc: 'This is description',
  start: iscStart,
  hours: iscHours,
};

export const fetchSingleUser = createAsyncThunk(
  'scheduledclass/selectedSearchUser',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/single/${userId}`);
      // console.log(response.data);
      if (response.data.classTypes.legth === 0) {
        // fetch all class types
        await dispatch(fetchAllClassTypes(null));
      }
      if (response.data.subjects.legth === 0) {
        // fetch all subjects
        await dispatch(fetchAllSubjects(null));
      }
      return response.data;
    } catch (error) {
      // console.log(error.response.status);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error?.response?.data?.msg]));
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// scou = Scheduled Class of a User
export const fetchAllRequestedSCOU = createAsyncThunk(
  'scheduledclass/allRequestedScheduledClass',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`/scheduledclass/member/${userId}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error?.response?.data?.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// scou = Scheduled Class of a User
export const fetchSingleScheduledClass = createAsyncThunk(
  'scheduledclass/singleScheduledClass',
  async (scheduledclassId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/scheduledclass/single/${scheduledclassId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error?.response?.data?.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }else if(error?.response?.status === 404){
        Router.push('/user/dashboard');
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const scheduledclassSlice = createSlice({
  name: 'scheduledclass',
  initialState: {
    /**
     * @static content
     */
    showReviewFields: false,
    madeRequest: false,
    /**
     * @dynamic or changable elements of the website
     */
    addscheduledclass: initicalAddScheduledClass,

    selectedSearchUser: {},
    selectedClassTypesSU: [],
    selectedSubjectsSU: [],

    // scou = Scheduled Class of a User
    requestedSCOU: [],
    acceptedSCOU: [],
    rejectedSCOU: [],

    initializeSchedule: initialAScheduledClass,
    singleScheduledClass: {},
  },
  reducers: {
    showRequest: (state, action) => {
      state.madeRequest = action.payload;
    },
    setShowReviewFields: (state, action)=>{
      state.showReviewFields = action.payload;
    },
    setRequestedSCOU: (state, action) => {
      state.requestedSCOU = action.payload;
    },
    setAcceptedSCOU: (state, action) => {
      state.acceptedSCOU = action.payload;
    },
    setRejectedSCOU: (state, action) => {
      state.rejectedSCOU = action.payload;
    },
    setAddscheduledclass: (state, action) => {
      //   state.addscheduledclass = { ...state.addscheduledclass, ...action.payload };
      state.addscheduledclass = action.payload;
    },
    setSelectedSearchUser: (state, action) => {
      state.selectedSearchUser = action.payload;
    },
    setInitializeSchedule: (state, action) => {
      state.initializeSchedule = {
        ...state.initializeSchedule,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    // builder.addCase(addNewPost.fulfilled, (state, action) => {
    //   // We can directly add the new post object to our posts array
    //   state.posts.push(action.payload)
    // })
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      // console.log(action.payload, state);
      state.selectedSearchUser = action.payload.user;
      const initialSchedule = {
        receverId: action.payload.user.id,
        desc: 'This is description',
        start: iscStart,
        hours: iscHours,
      };
      if (action.payload.subjects.length > 0) {
        state.selectedSubjectsSU = action.payload.subjects;
        initialSchedule.SubjectId = action.payload.subjects[0].id;
      }
      if (action.payload.classTypes.length > 0) {
        state.selectedClassTypesSU = action.payload.classTypes;
        initialSchedule.ClassTypeId = action.payload.classTypes[0].id;
      }
      state.initializeSchedule = initialSchedule;
    });

    builder.addCase(fetchAllRequestedSCOU.fulfilled, (state, action) => {
      state.requestedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === PENDING
      );
      state.acceptedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === APPROVED
      );
      state.rejectedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === REJECTED
      );
    });

    builder.addCase(fetchSingleScheduledClass.fulfilled, (state, action)=>{
      state.singleScheduledClass = action.payload.scheduledclass;
    });
  },
});

export const {
  // Showing content
  showRequest,
  setShowReviewFields,

  // scheduled class of a user
  setRequestedSCOU,
  setAcceptedSCOU,
  setRejectedSCOU,

  // More
  setAddscheduledclass,
  setSelectedSearchUser,
  setInitializeSchedule,
} = scheduledclassSlice.actions;

export default scheduledclassSlice.reducer;
