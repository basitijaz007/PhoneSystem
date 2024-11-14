import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialedNumber: "",
  device: null,
  isCalling: false,
  currentCall: null,
  callDuration: 0,
  callAccepted: false,
  intervalId: null,
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setDialedNumber: (state, action) => {
      state.dialedNumber = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setIsCalling: (state, action) => {
      state.isCalling = action.payload;
    },
    setCurrentCall: (state, action) => {
      state.currentCall = action.payload;
    },
    setCallDuration: (state, action) => {
      state.callDuration = action.payload;
    },
    setCallAccepted: (state, action) => {
      state.callAccepted = action.payload;
    },
    setIntervalId: (state, action) => {
      state.intervalId = action.payload;
    },
    resetCallState: () => initialState,
  },
});
export const {
  setDialedNumber,
  setDevice,
  setIsCalling,
  setCurrentCall,
  setCallDuration,
  setCallAccepted,
  resetCallState,
  setIntervalId,
} = callSlice.actions;

export default callSlice.reducer;
