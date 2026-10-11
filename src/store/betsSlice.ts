import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBets } from "../api/bets";
import type { Match } from "../types";

export const loadBets = createAsyncThunk("bets/load", fetchBets);

interface BetsState {
  items: Match[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BetsState = {
  items: [],
  status: "idle",
  error: null,
};

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadBets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadBets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bilinmeyen hata";
      });
  },
});

export default betsSlice.reducer;
