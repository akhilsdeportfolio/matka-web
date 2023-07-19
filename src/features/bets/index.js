import { createSlice } from "@reduxjs/toolkit";

const initState = [];

const betsSlice = createSlice({
  name: "bets",
  initialState: initState,
  reducers: {
    addBets(state, action) {
      return [...action.payload]
    },    
  },
});

export const { addBets } = betsSlice.actions;

export default betsSlice.reducer;
