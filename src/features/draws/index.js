import { createSlice } from "@reduxjs/toolkit";

const initState = [];

const drawsSlice = createSlice({
  name: "draws",
  initialState: initState,
  reducers: {
    addDrawId(state, action) {
      return action.payload
    },
  },
});

export const { addDrawId } = drawsSlice.actions;

export default drawsSlice.reducer;
