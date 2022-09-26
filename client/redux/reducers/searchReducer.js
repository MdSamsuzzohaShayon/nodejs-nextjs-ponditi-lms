/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { types } from '../../config/keys';

const { ONLINE, OFFLINE, TL } = types;

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    searchTypes: [ONLINE, OFFLINE, TL],
    searchParams: {
      classtype: 0, // id
      subject: 0, // id
      types: ONLINE, // Online
    },

    // Add a default value
    newClasstypeList: [],
    newSubjectList: [],
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.addSearch = { ...state.addSearch, ...action.payload };
    },
    setNewClasstypeList: (state, action)=>{
        state.newClasstypeList = action.payload;
    },
    setNewSubjectList: (state, action)=>{
        state.newSubjectList = action.payload;
    },
  },
});

export const { setSearchParams, setNewClasstypeList, setNewSubjectList } = searchSlice.actions;

export default searchSlice.reducer;
