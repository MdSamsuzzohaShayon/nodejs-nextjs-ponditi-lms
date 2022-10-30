/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';
import { scheduledclassStatus, types } from '../../config/keys';
import { resetAuthUserInfo, fetchSelectedSingleUser } from './userReducer';

const { APPROVED, PENDING, REJECTED, START_CLASS, FINISH_CLASS } =
  scheduledclassStatus;
const { ONLINE } = types;

const initicalAddScheduledClass = {
  name: '',
  subjectId: '',
};

const today = new Date();
const iscHours = 1;
const iscStart = today.toISOString();
const initialAScheduledClass = {
  receverId: null,
  ClassTypeId: null,
  SubjectId: null,
  desc: 'This is description',
  date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
  time: null,
  tutionplace: ONLINE,
  // start: iscStart,
  // hours: iscHours,
};

const initialSCTabElements = [
  {
    id: 1,
    name: APPROVED,
    text: 'Approved Class',
  },
  {
    id: 2,
    name: PENDING,
    text: 'Pending Class',
  },
  {
    id: 3,
    name: REJECTED,
    text: 'Rejected Class',
  },
  {
    id: 4,
    name: START_CLASS,
    text: 'Running Class',
  },
  {
    id: 5,
    name: FINISH_CLASS,
    text: 'Completed Class',
  },
];

const initialSlotList = [
  {
    id: 1,
    slot: 8,
    slotName: '08 - 09',
    ampm: 'AM',
  },
  {
    id: 2,
    slot: 9,
    slotName: '09 - 10',
    ampm: 'AM',
  },
  {
    id: 3,
    slot: 10,
    slotName: '10 - 11',
    ampm: 'AM',
  },
  {
    id: 4,
    slot: 11,
    slotName: '11 - 12',
    ampm: 'AM',
  },
  {
    id: 5,
    slot: 12,
    slotName: '12 - 01',
    ampm: 'PM',
  },
  {
    id: 6,
    slot: 1,
    slotName: '01 - 02',
    ampm: 'PM',
  },
  {
    id: 7,
    slot: 2,
    slotName: '02 - 03',
    ampm: 'PM',
  },
  {
    id: 8,
    slot: 3,
    slotName: '03 - 04',
    ampm: 'PM',
  },
  {
    id: 9,
    slot: 4,
    slotName: '04 - 05',
    ampm: 'PM',
  },
  {
    id: 10,
    slot: 5,
    slotName: '05 - 06',
    ampm: 'PM',
  },
  {
    id: 11,
    slot: 6,
    slotName: '06 - 07',
    ampm: 'PM',
  },
  {
    id: 12,
    slot: 7,
    slotName: '07 - 08',
    ampm: 'PM',
  },
  {
    id: 13,
    slot: 8,
    slotName: '08 - 09',
    ampm: 'PM',
  },
  {
    id: 14,
    slot: 9,
    slotName: '09 - 10',
    ampm: 'PM',
  },
];

const initialLeaveAReview = { stars: 0, comment: '' };

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
      } else if (error?.response?.status === 404) {
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
    slotList: initialSlotList,
    tabElements: initialSCTabElements,
    generateBill: 0, // bill per minutes
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
    runningSCOU: [],
    completedSCOU: [],

    allScheduledClassList: [],
    filteredSCOU: [],

    initializeSchedule: initialAScheduledClass,
    singleScheduledClass: {},

    updateScheduledClass: {},

    leaveAReview: initialLeaveAReview,
  },
  reducers: {
    showRequest: (state, action) => {
      state.madeRequest = action.payload;
    },
    setShowReviewFields: (state, action) => {
      state.showReviewFields = action.payload;
    },
    setGenerateBill: (state, action) => {
      state.generateBill = action.payload;
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
    setSingleScheduledClass: (state, action) => {
      state.singleScheduledClass = {
        ...state.singleScheduledClass,
        ...action.payload,
      };
    },
    setUpdateScheduledClass: (state, action) => {
      state.updateScheduledClass = {
        ...state.updateScheduledClass,
        ...action.payload,
      };
    },
    setLeaveAReview: (state, action) => {
      state.leaveAReview = {
        ...state.leaveAReview,
        ...action.payload,
      };
    },
    resetLeaveAReview: (state) => {
      state.leaveAReview = initialLeaveAReview;
    },
  },
  extraReducers(builder) {
    // builder.addCase(addNewPost.fulfilled, (state, action) => {
    //   // We can directly add the new post object to our posts array
    //   state.posts.push(action.payload)
    // })
    builder.addCase(fetchSelectedSingleUser.fulfilled, (state, action) => {
      // console.log(action.payload, state);
      state.selectedSearchUser = action.payload.user;
      /*
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
      */
    });

    builder.addCase(fetchAllRequestedSCOU.fulfilled, (state, action) => {
      state.allScheduledClassList = action.payload.classScheduledList;
      state.requestedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === PENDING
      );
      state.acceptedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === APPROVED
      );
      state.rejectedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === REJECTED
      );
      state.runningSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === START_CLASS
      );
      state.completedSCOU = action.payload?.classScheduledList.filter(
        (csl) => csl.status === FINISH_CLASS
      );
    });

    builder.addCase(fetchSingleScheduledClass.fulfilled, (state, action) => {
      state.singleScheduledClass = action.payload.scheduledclass;
    });
  },
});

export const {
  // Showing content
  showRequest,
  setShowReviewFields,
  setGenerateBill,

  // scheduled class of a user
  setRequestedSCOU,
  setAcceptedSCOU,
  setRejectedSCOU,

  // More
  setAddscheduledclass,
  setSelectedSearchUser,
  setInitializeSchedule,
  setSingleScheduledClass,
  setUpdateScheduledClass,
  setLeaveAReview,
  resetLeaveAReview,
} = scheduledclassSlice.actions;

export default scheduledclassSlice.reducer;
