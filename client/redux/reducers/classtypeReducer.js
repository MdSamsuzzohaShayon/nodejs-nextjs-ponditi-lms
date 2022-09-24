/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const classtypeSlice = createSlice({
  name: 'classtype',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    classtypeList: [],
    addClassType: {
      name: '',
    },
  },
  reducers: {
    setClasstypeList: (state, action) => {
      state.classtypeList = action.payload;
    },
    resetClasstypeList: (state, action) => {
      state.classtypeList = action.payload;
    },
    setAddClassType: (state, action) => {
      state.addClassType = { ...state.addClassType, ...action.payload };
    },
  },
});

export const { setClasstypeList, resetClasstypeList, setAddClassType } =
  classtypeSlice.actions;

export default classtypeSlice.reducer;
