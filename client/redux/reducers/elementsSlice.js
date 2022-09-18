/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  open: false,
  text: { heading: 'Heading', body: 'Body' },
};

const initialLayoutItemList = [
  {
    id: 1,
    name: 'Studio Profile',
    link: '/studio/profile',
    icon: 'ManageAccount',
    subList: [],
  },
  {
    id: 2,
    name: 'Staff',
    link: '/studio/staff',
    icon: 'SupervisedUserCircle',
    subList: [],
  },
  {
    id: 3,
    name: 'Instructors',
    link: '/studio/instructor',
    icon: 'PregnantWoman',
    subList: [],
  },
  {
    id: 4,
    name: 'Class',
    link: '/studio/danceclass',
    icon: 'Class',
    subList: [],
  },
  {
    id: 5,
    name: 'Rooms',
    link: '/studio/rooms',
    icon: 'MeetingRoom',
    subList: [],
  },
  {
    id: 6,
    name: 'Sessions',
    link: '/studio/sessions',
    icon: 'Sip',
    subList: [
      {
        subId: 6.1,
        name: 'Add',
        icon: 'Add',
      },
      {
        subId: 6.2,
        name: 'List',
        icon: 'FormatListBulleted',
      },
    ],
  },
];

const elementsSlice = createSlice({
  name: 'elements',
  initialState: {
    modal: initialModalState,
    isLoading: false,
    layoutItemList: initialLayoutItemList,
    selectedSubMenu: {
      subId: null,
      subName: null,
    },
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
    setSubMenu: (state, action) => {
      state.selectedSubMenu = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleLoading, setSubMenu } =
  elementsSlice.actions;

export default elementsSlice.reducer;
