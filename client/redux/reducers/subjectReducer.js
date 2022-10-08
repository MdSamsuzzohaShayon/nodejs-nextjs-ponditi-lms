/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { setErrorList } from './elementsSlice';
import { setAllSubjectList } from './searchReducer';

const initialAddSubject = {
  name: '',
  classTypeId: [],
};

const fetchSubjects = async (args, { dispatch, rejectWithValue }) => {
  try {
    // dispatch(toggleLoading(true));
    // console.log('try');
    const response = await axios.get('/subject/all');
    return response.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    return rejectWithValue(error.response.data);
  }
};

export const fetchAllSubjects = createAsyncThunk(
  'scheduledclass/getAllSubjects',
  fetchSubjects
);

export const fetchAllSubjectsSearch = createAsyncThunk(
  'scheduledclass/getAllSubjectsSearch',
  fetchSubjects
);

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    subjectList: [],
    subjectListCopy: [], // Unchangable
    addSubject: initialAddSubject,
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
    resetAddSubject: (state) => {
      state.addSubject = initialAddSubject;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSubjects.fulfilled, (state, action) => {
      if (action.payload.subjects.length > 0) {
        state.subjectList = action.payload.subjects;
      }
    });
    builder.addCase(fetchAllSubjectsSearch.fulfilled, (state, action) => {
      const defaultItem = { id: 0, name: 'Any Subject' };
      state.subjectList = [defaultItem, ...action.payload.subjects];
      state.subjectListCopy = [defaultItem, ...action.payload.subjects];
    });
  },
});

export const {
  setSubjectList,
  resetSubjectList,
  setAddSubject,
  resetAddSubject,
} = subjectSlice.actions;

export default subjectSlice.reducer;
