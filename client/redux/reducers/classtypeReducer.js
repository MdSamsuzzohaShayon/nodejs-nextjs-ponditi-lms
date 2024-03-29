/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';

const initialAddClassType = {
  name: '',
  subjectId: [],
  tuitionmId: [],
};

const fetchClasstypes = async (args, { dispatch, rejectWithValue }) => {
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

export const fetchAllClassTypes = createAsyncThunk('scheduledclass/getClassTypes', fetchClasstypes);
export const fetchAllClassTypesSearch = createAsyncThunk('scheduledclass/getClassTypesSearch', fetchClasstypes);

export const classtypeSlice = createSlice({
  name: 'classtype',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    classtypeList: [],
    constClasstypeList: [],
    selectedClasstypeList: [], // list of ids
    addClassType: initialAddClassType,
    displayClassType: false,
  },
  reducers: {
    setClasstypeList: (state, action) => {
      state.classtypeList = action.payload;
    },
    resetClasstypeList: (state, action) => {
      state.classtypeList = action.payload;
    },
    setSelectedClasstype: (state, action) => {
      state.selectedClasstypeList = action.payload;
    },
    resetSelectedClasstype: (state) => {
      state.selectedClasstypeList = [];
    },
    setAddClassType: (state, action) => {
      state.addClassType = { ...state.addClassType, ...action.payload };
    },
    resetAddClassType: (state) => {
      state.addClassType = initialAddClassType;
    },
    setDisplayClassType: (state, action) => {
      state.displayClassType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllClassTypes.fulfilled, (state, action) => {
      if (action.payload.classTypes.length > 0) {
        state.classtypeList = action.payload.classTypes;
        state.constClasstypeList = action.payload.classTypes;
      }
    });
    builder.addCase(fetchAllClassTypesSearch.fulfilled, (state, action) => {
      if (action.payload.classTypes.length > 0) {
        const defaultClass = { id: 0, name: 'Any Class' };
        state.classtypeList = [defaultClass, ...action.payload.classTypes];
        state.constClasstypeList = action.payload.classTypes;
      }
    });
  },
});

export const { setClasstypeList, resetClasstypeList, setAddClassType, resetAddClassType, setSelectedClasstype, resetSelectedClasstype, setDisplayClassType } =
  classtypeSlice.actions;

export default classtypeSlice.reducer;
