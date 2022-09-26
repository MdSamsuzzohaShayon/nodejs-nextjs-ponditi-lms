/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { adminSidebarList } from '../../config/keys';

const { CLASS_TYPE, SUBJECT } = adminSidebarList;

const initialLoginAdmin = {
  phone: '',
  email: '',
  password: '',
};

const initialAdminSidebarElements = [
  {
    id: 1,
    name: CLASS_TYPE,
    text: 'Class Type',
  },
  {
    id: 2,
    name: SUBJECT,
    text: 'Subject',
  },
];

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    /**
     * @static elements
     */
    adminSidebarElements: initialAdminSidebarElements,
    selectedContent: CLASS_TYPE,
    /**
     * @dynamic or changable elements of the website
     */
    loginAdmin: initialLoginAdmin,
    useEmailToLogin: true,
  },
  reducers: {
    setLoginAdmin: (state, action) => {
      state.loginAdmin = { ...state.loginAdmin, ...action.payload };
    },
    resetAdmin: (state) => {
      state.loginAdmin = initialLoginAdmin;
    },
    toggleEmailAndPhone: (state) => {
      state.useEmailToLogin = !state.useEmailToLogin;
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
  },
});

export const {
  setLoginAdmin,
  resetAdmin,
  toggleEmailAndPhone,
  setSelectedContent,
} = adminSlice.actions;

export default adminSlice.reducer;
