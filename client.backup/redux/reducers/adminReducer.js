/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { adminSidebarList, scheduledclassStatus } from '../../config/keys';

const { CLASS_TYPE, SUBJECT, USERS, MEDIUM } = adminSidebarList;
const { APPROVED, PENDING, REJECTED, ANY } = scheduledclassStatus;

const initialLoginAdmin = {
  emailorpass: '',
  password: '',
};

const initialAdminSidebarElements = [
  {
    id: 1,
    name: MEDIUM,
    text: 'Tuition Medium',
  },
  {
    id: 2,
    name: CLASS_TYPE,
    text: 'Class Type',
  },
  {
    id: 3,
    name: SUBJECT,
    text: 'Subject',
  },
  {
    id: 4,
    name: USERS,
    text: 'Users',
  },
];

const initialAdminUserTabElement = [
  {
    id: 1,
    name: ANY,
    text: 'All User',
  },
  {
    id: 2,
    name: APPROVED,
    text: 'Approved User',
  },
  {
    id: 3,
    name: REJECTED,
    text: 'Rejected User',
  },
  {
    id: 4,
    name: PENDING,
    text: 'Pending User',
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
    adminUserTabElement: initialAdminUserTabElement,
    selectedTabElement: ANY,
    /**
     * @dynamic or changable elements of the website
     */
    loginAdmin: initialLoginAdmin,
  },
  reducers: {
    setSelectedTabElement: (state, action) => {
      state.selectedTabElement = action.payload;
    },
    setLoginAdmin: (state, action) => {
      state.loginAdmin = { ...state.loginAdmin, ...action.payload };
    },
    resetAdmin: (state) => {
      state.loginAdmin = initialLoginAdmin;
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
  },
});

export const { setSelectedTabElement, setLoginAdmin, resetAdmin, setSelectedContent } = adminSlice.actions;

export default adminSlice.reducer;
