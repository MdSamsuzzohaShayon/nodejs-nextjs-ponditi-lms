/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';

const initialAddTuitionm = {
  name: '',
  ClassTypeId: [],
};

const fetchTuitionms = async (args, { dispatch, rejectWithValue }) => {
  try {
    // dispatch(toggleLoading(true));
    // console.log('try');
    const response = await axios.get('/tuitionm/all');
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

export const fetchAllTuitionms = createAsyncThunk('scheduledclass/getTuitionms', fetchTuitionms);

export const fetchAllTuitionmsSearch = createAsyncThunk('scheduledclass/getTuitionmsSearch', fetchTuitionms);

export const tuitionmSlice = createSlice({
  name: 'tuitionm',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    tuitionmList: [],
    tuitionmListCopy: [],
    selectedTuitionmList: [],
    addTuitionm: initialAddTuitionm,
  },
  reducers: {
    setTuitionmList: (state, action) => {
      state.tuitionmList = action.payload;
    },
    resetTuitionmList: (state, action) => {
      state.tuitionmList = action.payload;
    },
    setSelectedTuitionm: (state, action) => {
      state.selectedTuitionmList = action.payload;
    },
    resetSelectedTuitionm: (state) => {
      state.selectedTuitionmList = [];
    },
    setAddTuitionm: (state, action) => {
      state.addTuitionm = { ...state.addTuitionm, ...action.payload };
    },
    resetAddTuitionm: (state) => {
      state.addTuitionm = initialAddTuitionm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTuitionms.fulfilled, (state, action) => {
      if (action.payload.tuitionms.length > 0) {
        state.tuitionmList = action.payload.tuitionms;
      }
    });
    builder.addCase(fetchAllTuitionmsSearch.fulfilled, (state, action) => {
      const defaultItem = { id: 0, name: 'Any Medium' };
      state.tuitionmList = [defaultItem, ...action.payload.tuitionms];
      state.tuitionmListCopy = action.payload.tuitionms;
    });
  },
});

export const { setTuitionmList, resetTuitionmList, setAddTuitionm, resetAddTuitionm, setSelectedTuitionm, resetSelectedTuitionm } = tuitionmSlice.actions;

export default tuitionmSlice.reducer;
