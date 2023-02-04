/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { setErrorList } from './elementsSlice';
import axios from '../../config/axios';
import { RoomMessageInterface, RoomMessageStateType, MessageFetchParamsInterface, RoomListInterface } from '../../types/redux/messageinterface';

const initialMessagesOfARoom: RoomMessageInterface[] = [];
const initialRoomListOfAUser: RoomListInterface[] = [];

const setANewMessageType: CaseReducer<RoomMessageStateType, PayloadAction<RoomMessageInterface>> = (state, action) => {
  // console.log(action.payload);
  // console.log(state.messagesOfARoom);
  
  state.messagesOfARoom = [...state.messagesOfARoom, action.payload];
};

export const fetchAllMessagesOfARoom = createAsyncThunk('message/getMessagesOfARoom', async (args: MessageFetchParamsInterface, { dispatch, rejectWithValue }) => {
  try {
    // dispatch(toggleLoading(true));
    // console.log('try');
    const params: MessageFetchParamsInterface = {
      senderId: args.senderId,
      receiverId: args.receiverId,
    };
    const response = await axios.get('/message/all', { params });
    // console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchAllRoomsOfAUser = createAsyncThunk('message/getRoomsOfAUser', async (args, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get('/message/rooms');
    // console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error?.response?.data?.msg) {
      dispatch(setErrorList([error?.response?.data?.msg]));
    }
    return rejectWithValue(error.response.data);
  }
});

export const classtypeSlice = createSlice({
  name: 'message',
  initialState: {
    /**
     * @dynamic or changable elements of the website
     */
    roomListOfAUser: initialRoomListOfAUser,
    messagesOfARoom: initialMessagesOfARoom,
  },
  reducers: {
    setANewMessage: setANewMessageType,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMessagesOfARoom.fulfilled, (state, action) => {
      if (action.payload.messages.length > 0) {
        state.messagesOfARoom = action.payload.messages;
      }
    });
    builder.addCase(fetchAllRoomsOfAUser.fulfilled, (state, action) => {
      if (action.payload.rooms.length > 0) {
        // console.log(action.payload.rooms);
        state.roomListOfAUser = action.payload.rooms;
      }
    });
  },
});

export const { setANewMessage } = classtypeSlice.actions;

export default classtypeSlice.reducer;
