/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialCurrentUser = {
  firstname: '',
  lastname: '',
  password: '',
  password2: '',
  phone: '',
  email: '',
  // role: '',
  age: 0,
  profession: '',
  institution: '',
  subjects: '',
  experience: 0,
  location: '',
  // otp: '',
  degree: '',
  major: '',
  passing_year: 2022,
  cgpa: 3.4,
};

// http://www.healthstream.com/hlchelp/Administrator/Classes/HLC_Time_Zone_Abbreviations.htm

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialCurrentUser,
    otpCode: '',
    loginInfo: {
      phone: '',
      email: '',
      password: ''
    }
  },
  reducers: {
    resetUser: (state) => {
      state.currentUser = initialCurrentUser;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setLoginInfo: (state, action)=>{
      state.loginInfo =  { ...state.loginInfo, ...action.payload };
    },
    setOtpCode: (state, action) => {
      state.otpCode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetUser, setCurrentUser, setOtpCode, setLoginInfo } = userSlice.actions;

export default userSlice.reducer;
