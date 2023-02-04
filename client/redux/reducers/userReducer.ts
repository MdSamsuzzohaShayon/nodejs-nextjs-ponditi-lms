/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */

// React/next
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';

// Redux
import { fetchAllClassTypes } from './classtypeReducer';
import { fetchAllSubjects } from './subjectReducer';
import { setErrorList } from './elementsSlice';

// Config/utils
import { userDashboardSidebarList, SEND_CODE, scheduledclassStatus, roles, TS_SELECT } from '../../config/keys';
import axios from '../../config/axios';

// Types
import { AuthUserInfoInterface, SingleUserInterface } from '../../types/redux/userInterface';
// import { tuitionplace } from '../../utils/types';

const { REJECTED, PROFILE } = userDashboardSidebarList;
const { PENDING, APPROVED } = scheduledclassStatus;
const { TEACHER } = roles;

// ps = property step
const initialps1 = [
  // get length of it
  { field: 'firstname', text: 'Firstname', default: '' },
  { field: 'lastname', text: 'Lastname', default: '' },
  { field: 'role', text: 'Role', default: 'STUDENT' },
  { field: 'password', text: 'Password', default: '' },
  { field: 'password2', text: 'Confirm Password', default: '' },
  { field: 'phone', text: 'Phone', default: '' },
  { field: 'email', text: 'Email', default: '' },
];

const psobj1 = {};
for (let i = 0; i < initialps1.length; i += 1) {
  psobj1[initialps1[i].field] = initialps1[i].default;
}

const initialps2 = [
  // role
  { field: 'age', text: 'Age', default: 0 },
  { field: 'profession', text: 'Profession', default: '' },
  { field: 'institution', text: 'Institution', default: '' },
  { field: 'subjects', text: 'Subjects', default: '' },
  { field: 'experience', text: 'Experience', default: 0 },
  { field: 'location', text: 'Location', default: '' },
];
const psobj2 = {};
for (let i = 0; i < initialps2.length; i += 1) {
  psobj2[initialps2[i].field] = initialps2[i].default;
}

const initialps3 = [
  // education
  // otp: '',
  { field: 'degree', text: 'Degree', default: '' },
  { field: 'major', text: 'Major', default: '' },
  { field: 'passing_year', text: 'Passing Year', default: 2022 },
  { field: 'cgpa', text: 'CGPA', default: 3.4 },
];
const psobj3 = {};
for (let i = 0; i < initialps3.length; i += 1) {
  psobj3[initialps3[i].field] = initialps3[i].default;
}

const initialRegisterStaps = [
  {
    step: 1,
    properties: initialps1,
  },
  {
    step: 2,
    properties: initialps2,
  },
  {
    step: 3,
    properties: initialps3,
  },
];

const initialCurrentUser: SingleUserInterface = {
  id: null,
  name: '',
  phone: '',
  image: '',
  cc: '',
  email: '',
  district: '',
  presentaddress: '',
  age: null,
  profession: '',
  institution: '',
  experience: '',
  isActive: '',
  isVerified: true,
  tutionplace: '',
  tuitionmedium: '',
  isAvailable: true,
  role: TEACHER,
  sl_rate: null,
  tl_rate: null,
  ol_rate: null,
};

const initialRegisterableUser = {
  name: null,
  email: null,
  profession: null,
  experience: null,
  // district: null,
  passing_year: null,
  role: TEACHER,
  tutionplace: [],
  sl_rate: null,
  tl_rate: null,
  ol_rate: null,
  presentaddress: null,
  degree: null,
  running_study: false,
  major: null,
  institution: null,
  pinstitution: null,
};

const initialLoginInfo = {
  phone: null,
  password: null,
};

const initialResetPassReq = { emailorpassword: '', otp: '', password: '', password2: '' };

const initialSendOTP = {
  phone: '',
  cc: '88',
};

const initialVerifyCode = {
  phone: '',
  otp: '',
};

const initialAuthUserInfo: AuthUserInfoInterface = {
  name: null,
  email: null,
  id: null,
  role: null,
};

const initialDegreeList = [
  {
    id: 1,
    name: 'SSC',
  },
  {
    id: 2,
    name: 'HSC',
  },
  {
    id: 3,
    name: 'DIPLOMA',
  },
  {
    id: 4,
    name: 'HONOURS',
  },
];

// const initialTuitionStyles = tuitionplace;

const fetchUser = async (userId: number, { dispatch, rejectWithValue }) => {
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
  } catch (error: any) {
    // console.log(error.response.status);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    if (error?.response?.status === 401 || error?.response?.status === 405) {
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        Router.push('/admin');
      } else if (error?.response?.status === 404) {
        Router.push('/admin');
      }
    }
    return rejectWithValue(error.response.data);
  }
};

export const fetchCurrentSingleUser = createAsyncThunk('user/currentSingleUser', fetchUser);
export const fetchSelectedSingleUser = createAsyncThunk('user/selectedSingleUser', fetchUser);

export const requestHistorySeen = createAsyncThunk('user/historySeen', async (args, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.put(`/user/notification/seen`);
    return response.data;
  } catch (error: any) {
    // console.log(error.response.status);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    if (error?.response?.status === 401 || error?.response?.status === 405) {
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        Router.push('/user');
      } else if (error?.response?.status === 404) {
        Router.push('/user');
      }
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchAllUsersByAdmin = createAsyncThunk('user/allUsers', async (props, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get(`/user/all`);
    return response.data;
  } catch (error: any) {
    // console.log(error.response.status);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    if (error?.response?.status === 401 || error?.response?.status === 405) {
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        Router.push('/admin');
      } else if (error?.response?.status === 404) {
        Router.push('/admin');
      }
    }
    return rejectWithValue(error.response.data);
  }
});

// http://www.healthstream.com/hlchelp/Administrator/Classes/HLC_Time_Zone_Abbreviations.htm

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    /**
     * @static not connected to backend and databases
     * for only showing correct content in sidebar on user dashboard
     */
    // dashboardSidebarElements: initialDashboardSidebarElements,
    selectedContent: PROFILE,
    degreeList: initialDegreeList,
    userNotifications: [],
    userUnseenNotifications: [],

    /**
     * @dynamic all those connected to backend and databases
     */
    currentUser: initialCurrentUser, // The user who logged in
    registerableUser: initialRegisterableUser, // The user who is going to register
    userSubjects: [],
    userExamList: [],
    userTuitionmList: [],
    userClassTypes: [],
    selectedUser: { ...initialCurrentUser, role: TEACHER }, // the user whose detail will be shown
    selectedUserRole: TEACHER, // the user whose detail will be shown

    // tuitionStyles: initialTuitionStyles,

    userSendVerifyStep: SEND_CODE,
    userFormsType: TS_SELECT,
    // userFormsType: REGISTER,

    loginInfo: initialLoginInfo,
    resetPassReq: initialResetPassReq,
    resetPassStep: 1,

    sendOTP: initialSendOTP,
    hasPhone: false,
    verifyCode: initialVerifyCode,

    selectedStep: 1, // default 1
    registerSteps: initialRegisterStaps,

    authenticatedUser: false,

    authUserInfo: initialAuthUserInfo,

    allUserList: [],
    allPendingUserList: [],
    allRejectedUserList: [],
    allApprovedUserList: [],

    // For updating a user
    updatePart: 1,
    // cts = class types subjects
    updateUser: {},
  },
  reducers: {
    /**
     * @static not connected to backend and databases
     */
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },

    /**
     * @dynamic all those connected to backend and databases
     */
    resetLoginInfo: (state) => {
      state.loginInfo = initialLoginInfo;
    },
    resetUser: (state) => {
      state.currentUser = initialCurrentUser;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setRegisterableUser: (state, action) => {
      state.registerableUser = { ...state.registerableUser, ...action.payload };
    },
    resetRegisterableUser: (state) => {
      state.registerableUser = initialRegisterableUser;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = { ...state.loginInfo, ...action.payload };
    },
    setChangeResetPassReq: (state, action) => {
      state.resetPassReq = { ...state.resetPassReq, ...action.payload };
    },
    resetChangeResetPassReq: (state) => {
      state.resetPassReq = initialResetPassReq;
    },
    setResetPassStep: (state, action) => {
      state.resetPassStep = action.payload;
    },
    setVerifyCode: (state, action) => {
      state.verifyCode = { ...state.verifyCode, ...action.payload };
    },
    resetVerifyCode: (state) => {
      state.verifyCode = initialVerifyCode;
    },
    setHasPhone: (state, action) => {
      state.hasPhone = action.payload;
    },

    setSelectedStep: (state, action) => {
      state.selectedStep = action.payload;
    },
    setUserFormsType: (state, action) => {
      state.userFormsType = action.payload;
    },
    setUserSendVerifyStep: (state, action) => {
      state.userSendVerifyStep = action.payload;
    },

    setSendOTP: (state, action) => {
      state.sendOTP = { ...state.sendOTP, ...action.payload };
    },
    resetSendOTP: (state) => {
      state.sendOTP = initialSendOTP;
    },

    toggleAuthUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    setAuthUserInfo: (state, action) => {
      state.authUserInfo = action.payload;
    },
    resetAuthUserInfo: (state) => {
      state.authUserInfo = initialAuthUserInfo;
    },
    resetAllUserList: (state) => {
      state.allUserList = [];
    },
    setUpdatePart: (state, action) => {
      state.updatePart = action.payload;
    },
    // cts = class type subject
    setUpdateUser: (state, action) => {
      state.updateUser = { ...state.updateUser, ...action.payload };
    },
    resetUpdateUser: (state) => {
      state.updateUser = {};
    },
  },
  extraReducers(builder) {
    // builder.addCase(addNewPost.fulfilled, (state, action) => {
    //   // We can directly add the new post object to our posts array
    //   state.posts.push(action.payload)
    // })
    builder.addCase(fetchCurrentSingleUser.fulfilled, (state, action) => {
      // console.log(action.payload, state);
      state.userUnseenNotifications = action.payload.notifications.filter((n) => n.viewed === false);
      state.userNotifications = action.payload.notifications;
      state.currentUser = action.payload.user;
      state.userTuitionmList = action.payload.tuitionms;
      state.userClassTypes = action.payload.classTypes;
      state.userSubjects = action.payload.subjects;
      state.userExamList = action.payload.educations;
    });
    builder.addCase(fetchCurrentSingleUser.rejected, (state) => {
      // console.log(action.payload, state);
      state.allUserList = [];
      state.authUserInfo = initialAuthUserInfo;
    });

    builder.addCase(fetchSelectedSingleUser.fulfilled, (state, action) => {
      // console.log(action.payload, state);
      state.selectedUser = action.payload.user;
      state.userTuitionmList = action.payload.tuitionms;
      state.userClassTypes = action.payload.classTypes;
      state.userSubjects = action.payload.subjects;
      state.userExamList = action.payload.educations;
    });
    builder.addCase(fetchSelectedSingleUser.rejected, (state) => {
      // console.log(action.payload, state);
      state.allUserList = [];
    });

    builder.addCase(fetchAllUsersByAdmin.fulfilled, (state, action) => {
      state.allUserList = action.payload.users;
      state.allPendingUserList = action.payload.users.filter((user) => user.isActive === PENDING);
      state.allRejectedUserList = action.payload.users.filter((user) => user.isActive === REJECTED);
      state.allApprovedUserList = action.payload.users.filter((user) => user.isActive === APPROVED);
    });
    builder.addCase(fetchAllUsersByAdmin.rejected, (state) => {
      state.allUserList = [];
      state.authUserInfo = initialAuthUserInfo;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetUser,
  setCurrentUser,
  setVerifyCode,
  setLoginInfo,
  resetLoginInfo,
  setSelectedStep,
  setUserFormsType,
  setUserSendVerifyStep,
  setSendOTP,
  resetSendOTP,
  resetVerifyCode,
  setHasPhone,
  toggleAuthUser,
  setAuthUserInfo,
  resetAuthUserInfo,
  setSelectedContent,
  resetAllUserList,
  setUpdatePart,
  setUpdateUser,
  resetUpdateUser,
  setChangeResetPassReq,
  resetChangeResetPassReq,
  setResetPassStep,
  setRegisterableUser,
  resetRegisterableUser,
} = userSlice.actions;

export default userSlice.reducer;
