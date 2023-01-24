/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MenuItem } from '../../interfaces/redux/elementsInterface';

const initialModalState = {
  open: false,
  text: { heading: 'Heading', body: 'Body' },
};

const initialLayoutItemList: MenuItem[] = [
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
  // {
  //   id: 4,
  //   name: 'faq',
  //   link: '/faq',
  // },
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
    /**
     * @static elements
     */
    menuItemList: initialLayoutItemList,
    socialItems: initialSocialLinks,

    /**
     * @dynamic or changable elements of the website
     */
    modal: initialModalState,
    isLoading: false,
    errorList: [],
    successMessageList: [],
    // Form validation
    noValidate: true,

    openPriceCalc: false, // default false
    pageYOffset: 0,
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
    resetErrorList: (state) => {
      state.errorList = [];
    },
    setSuccessMessageList: (state, action) => {
      state.successMessageList = action.payload;
    },
    resetSuccessMessageList: (state) => {
      state.successMessageList = [];
    },
    setNoValidate: (state, action) => {
      state.noValidate = action.payload;
    },
    setOpenPriceCalc: (state, action) => {
      state.openPriceCalc = action.payload;
    },
    setPageYOffset: (state, action) => {
      state.pageYOffset = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleLoading,
  setErrorList,
  setSuccessMessageList,
  resetErrorList,
  setNoValidate,
  setOpenPriceCalc,
  resetSuccessMessageList,
  setPageYOffset,
} = elementsSlice.actions;

export default elementsSlice.reducer;
