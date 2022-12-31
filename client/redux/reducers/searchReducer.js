/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { types, roles, tuitionmediums } from '../../config/keys';
import { tuitionplace } from '../../utils/types';

const { ONLINE, TL, SL, ANY } = types;
const { BANGLA, ENGLISH, ARABIC } = tuitionmediums;

export const initialSearchParams = {
  location: null,
  ClassTypeId: null, // id
  SubjectId: null, // id
  tutionplace: ANY, // Online - tution location
  TuitionmId: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTypeList: [
      // {
      //   id: 0,
      //   type: ANY,
      //   text: 'Any types',
      // },
      ...tuitionplace,
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
    resetSearchUserList: (state) => {
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

export const { setSearchParams, setSearchUserList, setSearchAllUserList, setRPStart, setRPTotal, setRPTotalPage, setRPCurrentPage, resetSearchUserList } =
  searchSlice.actions;

export default searchSlice.reducer;
