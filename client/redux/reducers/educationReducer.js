/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SCIENCE, ARTS, COMMERCE, OTHERS } from '../../utils/types';

const initialSingleExam = {
  id: null,
  level: null,
  group: SCIENCE,
  institution: null,
  grade: null,
  cgpa: null,
  passing_year: null,
};

const initialEducationGroupList = [
  {
    id: 1,
    name: SCIENCE,
    text: 'Science',
  },
  {
    id: 2,
    name: ARTS,
    text: 'Arts',
  },
  {
    id: 3,
    name: COMMERCE,
    text: 'Commerce',
  },
  {
    id: 4,
    name: OTHERS,
    text: 'Others',
  },
];

export const educationSlice = createSlice({
  name: 'education',
  initialState: {
    educationGroupList: initialEducationGroupList,
    educationSingleExam: initialSingleExam,
    educationUpdateList: [],
  },
  reducers: {
    resetEducationUpdate: (state) => {
      state.educationUpdateList = [];
    },
    setEducationUpdate: (state, action) => {
      state.educationUpdateList = action.payload;
    },
  },
});

export const { setEducationUpdate, resetEducationUpdate } = educationSlice.actions;

export default educationSlice.reducer;
