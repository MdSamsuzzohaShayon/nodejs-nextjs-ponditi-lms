/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

// React/Next
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';

// Config/utils
import axios from '../../config/axios';


// Types
import { SingleScheduledClassInterface } from '../../types/pages/scheduledclassInterface';
import { ScheduledClassInterface, SlotInterface, TuitionStyle } from '../../types/redux/scheduledclassInterface';
import { TimeAMPMEnum, TuitionStyleEnum, StatusEnum } from '../../types/enums';

// Redux
import { resetAuthUserInfo } from './userReducer';
import { setErrorList } from './elementsSlice';




/**
 * ==========================================================================================
 * INITIAL VALUES OF STATE
 */
const initicalAddScheduledClass = {
  name: '',
  subjectId: '',
};

const today = new Date();

const initialTuitionStyle: TuitionStyle[] = [
  {
    id: 1,
    text: 'Online',
    value: TuitionStyleEnum.ONLINE,
  },
  {
    id: 2,
    text: "Teacher's Location",
    value: TuitionStyleEnum.TL,
  },
  {
    id: 3,
    text: "Student's Location",
    value: TuitionStyleEnum.SL,
  },
];

const initialAScheduledClass: ScheduledClassInterface = {
  receiverId: 0,
  ClassTypeId: 0,
  SubjectId: 0,
  desc: 'This is Note',
  date: `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`,
  time: '',
  tutionplace: TuitionStyleEnum.ONLINE,
  tuitionlocation: '',
  // start: iscStart,
  // hours: iscHours,
};

const initialSCTabElements = [
  {
    id: 1,
    name: StatusEnum.APPROVED,
    text: 'Approved Class',
  },
  {
    id: 2,
    name: StatusEnum.PENDING,
    text: 'Pending Class',
  },
  {
    id: 3,
    name: StatusEnum.REJECTED,
    text: 'Rejected Class',
  },
  {
    id: 4,
    name: StatusEnum.START_CLASS,
    text: 'Running Class',
  },
  {
    id: 5,
    name: StatusEnum.FINISH_CLASS,
    text: 'Completed Class',
  },
];

const initialSlotList: SlotInterface[] = [
  {
    id: 1,
    slot: 8,
    slotName: '08 - 09',
    ampm: TimeAMPMEnum.AM,
  },
  {
    id: 2,
    slot: 9,
    slotName: '09 - 10',
    ampm: TimeAMPMEnum.AM,
  },
  {
    id: 3,
    slot: 10,
    slotName: '10 - 11',
    ampm: TimeAMPMEnum.AM,
  },
  {
    id: 4,
    slot: 11,
    slotName: '11 - 12',
    ampm: TimeAMPMEnum.AM,
  },
  {
    id: 5,
    slot: 12,
    slotName: '12 - 01',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 6,
    slot: 1,
    slotName: '01 - 02',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 7,
    slot: 2,
    slotName: '02 - 03',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 8,
    slot: 3,
    slotName: '03 - 04',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 9,
    slot: 4,
    slotName: '04 - 05',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 10,
    slot: 5,
    slotName: '05 - 06',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 11,
    slot: 6,
    slotName: '06 - 07',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 12,
    slot: 7,
    slotName: '07 - 08',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 13,
    slot: 8,
    slotName: '08 - 09',
    ampm: TimeAMPMEnum.PM,
  },
  {
    id: 14,
    slot: 9,
    slotName: '09 - 10',
    ampm: TimeAMPMEnum.PM,
  },
];

const initialLeaveAReview = { stars: 0, comment: '' };

const initialSingleScheduledClass: SingleScheduledClassInterface | Record<string, never> = {};

const initialRequestedSCOU: SingleScheduledClassInterface[] = [];
const initialAcceptedSCOU: SingleScheduledClassInterface[] = [];
const initialRejectedSCOU: SingleScheduledClassInterface[] = [];
const initialRunningSCOU: SingleScheduledClassInterface[] = [];
const initialCompletedSCOU: SingleScheduledClassInterface[] = [];

const initialAllScheduledClassList: SingleScheduledClassInterface[] = [];
const initialFilteredSCOU: SingleScheduledClassInterface[] = [];

/**
 * ==========================================================================================
 * FETCH DATA ASYNC IN REDUX
 */
export const fetchAllRequestedSCOU = createAsyncThunk('scheduledclass/allRequestedScheduledClass', async (userId: number, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get(`/scheduledclass/member/${userId}`);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
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
});

export const fetchSingleScheduledClass = createAsyncThunk('scheduledclass/singleScheduledClass', async (scheduledclassId: number, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get(`/scheduledclass/single/${scheduledclassId}`);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
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
});

/**
 * ==========================================================================================
 * SLICE | ACTION AND REDUCER
 */
export const scheduledclassSlice = createSlice({
  name: 'scheduledclass',
  initialState: {
    /**
     * @static content
     */
    showReviewFields: false,
    slotList: initialSlotList,
    tabElements: initialSCTabElements,
    tuitionStyle: initialTuitionStyle,
    generateBill: 0, // bill per minutes
    /**
     * @dynamic or changable elements of the website
     */
    addscheduledclass: initicalAddScheduledClass,

    selectedClassTypesSU: [],
    selectedSubjectsSU: [],

    // scou = Scheduled Class of a User
    requestedSCOU: initialRequestedSCOU,
    acceptedSCOU: initialAcceptedSCOU,
    rejectedSCOU: initialRejectedSCOU,
    runningSCOU: initialRunningSCOU,
    completedSCOU: initialCompletedSCOU,

    allScheduledClassList: initialAllScheduledClassList,
    filteredSCOU: initialFilteredSCOU,

    initializeSchedule: initialAScheduledClass,
    singleScheduledClass: initialSingleScheduledClass,

    updateScheduledClass: {},

    leaveAReview: initialLeaveAReview,
  },
  reducers: {
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

    builder.addCase(fetchAllRequestedSCOU.fulfilled, (state, action) => {
      state.allScheduledClassList = action.payload.classScheduledList;
      state.requestedSCOU = action.payload?.classScheduledList.filter((csl: SingleScheduledClassInterface) => csl.status === StatusEnum.PENDING);
      state.acceptedSCOU = action.payload?.classScheduledList.filter((csl: SingleScheduledClassInterface) => csl.status === StatusEnum.APPROVED);
      state.rejectedSCOU = action.payload?.classScheduledList.filter((csl: SingleScheduledClassInterface) => csl.status === StatusEnum.REJECTED);
      state.runningSCOU = action.payload?.classScheduledList.filter((csl: SingleScheduledClassInterface) => csl.status === StatusEnum.START_CLASS);
      state.completedSCOU = action.payload?.classScheduledList.filter((csl: SingleScheduledClassInterface) => csl.status === StatusEnum.FINISH_CLASS);
    });

    builder.addCase(fetchSingleScheduledClass.fulfilled, (state, action) => {
      state.singleScheduledClass = action.payload.scheduledclass;
    });
  },
});

/**
 * ==========================================================================================
 * EXPORT ACTION FUNCTION
 */
export const {
  // Showing content
  setShowReviewFields,
  setGenerateBill,

  // scheduled class of a user
  setRequestedSCOU,
  setAcceptedSCOU,
  setRejectedSCOU,

  // More
  setAddscheduledclass,
  setInitializeSchedule,
  setSingleScheduledClass,
  setUpdateScheduledClass,
  setLeaveAReview,
  resetLeaveAReview,
} = scheduledclassSlice.actions;

/**
 * ==========================================================================================
 * EXPORT REDUCER
 */
export default scheduledclassSlice.reducer;
