/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { setErrorList } from './elementsSlice';

export const fetchAllSubjects = createAsyncThunk(
  'scheduledclass/getAllSubjects',
  async (args, { dispatch, rejectWithValue }) => {
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
  }
);

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    subjectList: [],
    addSubject: {
      name: '',
      classTypeId: []
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
  extraReducers: (builder) => {
    builder.addCase(fetchAllSubjects.fulfilled, (state, action) => {
      state.subjectList = action.payload;
    });
  },
});

export const { setSubjectList, resetSubjectList, setAddSubject } =
  subjectSlice.actions;

export default subjectSlice.reducer;
