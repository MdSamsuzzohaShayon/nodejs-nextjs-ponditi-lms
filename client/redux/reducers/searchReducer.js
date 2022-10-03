/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { types, roles } from '../../config/keys';

const { ONLINE, TL, SL, ANY } = types;
const { TEACHER } = roles;

export const initialSearchParams = {
  location: '',
  ClassTypeId: '', // id
  SubjectId: '', // id
  type: ANY, // Online - tution location
  role: TEACHER,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTypeList: [
      {
        id: 0,
        type: ANY,
        text: 'Any types',
      },
      {
        id: 1,
        type: ONLINE,
        text: 'Online',
      },
      {
        id: 2,
        type: TL,
        text: "Teacher's Location",
      },
      {
        id: 3,
        type: SL,
        text: "Student's Location",
      },
    ],
    /**
     * @dynamic or changable elements of the website
     */
    searchParams: initialSearchParams,
    searchAllUserList: [],

    /**
     * @function for paginations
    */
    searchUserList: [],
    rpStart: 0, // rp = result pagination
    rpTotal: 10,
    rpCurrentPage: 1,
    rpTotalPage: 1,
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    setSearchUserList: (state, action) => {
      state.searchUserList = action.payload;
    },
    resetSearchUserList: (state)=>{
      state.searchUserList = [];
    },
    setSearchAllUserList: (state, action) => {
      state.searchAllUserList = action.payload;
    },
    setRPStart: (state, action) => {
      state.rpStart = action.payload;
    },
    setRPTotal: (state, action) => {
      state.rpTotal = action.payload;
    },
    setRPCurrentPage: (state, action) => {
      state.rpCurrentPage = action.payload;
    },
    setRPTotalPage: (state, action) => {
      state.rpTotalPage = action.payload;
    },
  },
});

export const {
  setSearchParams,
  setSearchUserList,
  setSearchAllUserList,
  setRPStart,
  setRPTotal,
  setRPTotalPage,
  setRPCurrentPage,
  resetSearchUserList,
} = searchSlice.actions;

export default searchSlice.reducer;
