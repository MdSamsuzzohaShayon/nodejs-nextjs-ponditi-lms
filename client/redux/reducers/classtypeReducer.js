/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';

export const fetchAllClassTypes = createAsyncThunk(
  'scheduledclass/getClassTypes',
  async (args, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/classtype/all');
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

export const classtypeSlice = createSlice({
  name: 'classtype',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    classtypeList: [],
    addClassType: {
      name: '',
      subjectId: [],
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
  extraReducers: (builder) => {
    builder.addCase(fetchAllClassTypes.fulfilled, (state, action) => {
      state.classtypeList = action.payload;
    });
  },
});

export const { setClasstypeList, resetClasstypeList, setAddClassType } =
  classtypeSlice.actions;

export default classtypeSlice.reducer;
