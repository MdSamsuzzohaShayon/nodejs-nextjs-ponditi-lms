/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { userDashboardSidebarList, SEND_CODE } from '../../config/keys';

const { CLASS_SCHEDULED, PROFILE, STUDENT_OR_TEACHER_REQUESTS } =
  userDashboardSidebarList;

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

const initialCurrentUser = {
  // Account
  ...psobj1,

  // personal info
  ...psobj2,

  // education
  ...psobj3,
};

const initialLoginInfo = {
  phoneoremail: '',
  password: '',
};

const initialSendOTP = {
  phone: '',
  cc: '+880',
};

const initialVerifyCode = {
  phone: '',
  otp: '',
};

const initialAuthUserInfo = {
  email: null,
  id: null,
  role: null,
};

const initialDashboardSidebarElements = [
  {
    id: 1,
    name: PROFILE,
    text: 'Profile',
  },
  {
    id: 2,
    name: STUDENT_OR_TEACHER_REQUESTS,
    text: 'SOT Request', // if logged in user is student then use student elsewhere use teacher
  },
  {
    id: 3,
    name: CLASS_SCHEDULED,
    text: 'Class Scheduled',
  },
];

// http://www.healthstream.com/hlchelp/Administrator/Classes/HLC_Time_Zone_Abbreviations.htm

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    /**
     * @static not connected to backend and databases
     * for only showing correct content in sidebar on user dashboard
     */
    dashboardSidebarElements: initialDashboardSidebarElements,
    selectedContent: PROFILE,

    /**
     * @dynamic all those connected to backend and databases
     */
    currentUser: initialCurrentUser,
    userFormsType: SEND_CODE,
    loginInfo: initialLoginInfo,
    loginWithEmail: true,
    teacherLogin: true,

    sendOTP: initialSendOTP,
    hasPhone: false,
    verifyCode: initialVerifyCode,

    selectedStep: 1,
    registerSteps: initialRegisterStaps,

    authenticatedUser: false,

    authUserInfo: initialAuthUserInfo,
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
    resetUser: (state) => {
      state.currentUser = initialCurrentUser;
    },
    resetLoginInfo: (state) => {
      state.loginInfo = initialLoginInfo;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = { ...state.loginInfo, ...action.payload };
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

    setLoginWith: (state, action) => {
      state.loginWithEmail = action.payload;
    },
    setTeacherLogin: (state, action) => {
      state.teacherLogin = action.payload;
    },
    setSelectedStep: (state, action) => {
      state.selectedStep = action.payload;
    },
    setUserFormsType: (state, action) => {
      state.userFormsType = action.payload;
    },

    setSendOTP: (state, action) => {
      state.sendOTP = { ...state.sendOTP, ...action.payload };
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
  },
});

// Action creators are generated for each case reducer function
export const {
  resetUser,
  setCurrentUser,
  setVerifyCode,
  setLoginInfo,
  setLoginWith,
  resetLoginInfo,
  setTeacherLogin,
  setSelectedStep,
  setUserFormsType,
  setSendOTP,
  resetVerifyCode,
  setHasPhone,
  toggleAuthUser,
  setAuthUserInfo,
  resetAuthUserInfo,
  setSelectedContent,
} = userSlice.actions;

export default userSlice.reducer;
