/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    subjectList: [],
    addSubject: {
      name: '',
      classTypeId: 1
    },
  },
  reducers: {
    setSubjectList: (state, action) => {
      state.subjectList = action.payload;
    },
    resetSubjectList: (state, action) => {
      state.subjectList = action.payload;
    },
    setAddSubject: (state, action) => {
      state.addSubject = { ...state.addSubject, ...action.payload };
    },
  },
});

export const { setSubjectList, resetSubjectList, setAddSubject } =
  subjectSlice.actions;

export default subjectSlice.reducer;
