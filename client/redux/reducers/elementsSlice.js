/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  open: false,
  text: { heading: 'Heading', body: 'Body' },
};

const initialLayoutItemList = [
  {
    id: 1,
    name: 'Home',
    link: '/home',
  },
  {
    id: 2,
    name: 'about',
    link: '/about',
  },
  {
    id: 3,
    name: 'contact',
    link: '/contact',
  },
  {
    id: 4,
    name: 'faq',
    link: '/faq',
  },
];

const initialSocialLinks = [
  {
    id: 1,
    name: 'fb',
    icon: 'fb.svg',
  },
  {
    id: 2,
    name: 'twitter',
    icon: 'twitter.svg',
  },
  {
    id: 3,
    name: 'linkedin',
    icon: 'linkedin.svg',
  },
  {
    id: 4,
    name: 'instagram',
    icon: 'instagram.svg',
  },
];

const elementsSlice = createSlice({
  name: 'elements',
  initialState: {
    modal: initialModalState,
    isLoading: false,
    menuItemList: initialLayoutItemList,
    socialItems: initialSocialLinks,
    errorList: [],
    successMessageList: [],
  },
  reducers: {
    openModal: (state, action) => {
      state.modal.open = true;
      state.modal.text = action.payload;
    },
    closeModal: (state) => {
      state.modal.open = false;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorList: (state, action) => {
      state.errorList = action.payload;
    },
    resetErrorList: (state)=>{
      state.errorList = [];
    },
    setSuccessMessageList: (state, action) => {
      state.successMessageList = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleLoading,
  setErrorList,
  setSuccessMessageList,
  resetErrorList
} = elementsSlice.actions;

export default elementsSlice.reducer;
