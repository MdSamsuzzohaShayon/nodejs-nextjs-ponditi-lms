/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';

const initialAddClassType = {
  name: '',
  subjectId: [],
};

const fetchClassTypes = async (args, { dispatch, rejectWithValue }) => {
  try {
    // dispatch(toggleLoading(true));
    // console.log('try');
    const response = await axios.get('/classtype/all');
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    return rejectWithValue(error.response.data);
  }
};

export const fetchAllClassTypes = createAsyncThunk(
  'scheduledclass/getClassTypes',
  fetchClassTypes
);

export const fetchAllClassTypesSearch = createAsyncThunk(
  'scheduledclass/getClassTypesSearch',
  fetchClassTypes
);

export const classtypeSlice = createSlice({
  name: 'classtype',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    classtypeList: [],
    addClassType: initialAddClassType,
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
    resetAddClassType: (state) => {
      state.addClassType = initialAddClassType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllClassTypes.fulfilled, (state, action) => {
      if (action.payload.classTypes.length > 0) {
        state.classtypeList = action.payload.classTypes;
      }
    });
    builder.addCase(fetchAllClassTypesSearch.fulfilled, (state, action) => {
      const defaultItem = { id: 0, name: 'Any Class' };
      state.classtypeList = [defaultItem, ...action.payload.classTypes];
    });
  },
});

export const {
  setClasstypeList,
  resetClasstypeList,
  setAddClassType,
  resetAddClassType,
} = classtypeSlice.actions;

export default classtypeSlice.reducer;
