import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Selection } from "../types";
import type { RootState } from "./store";

interface BasketState {
  selections: Record<string, Selection>;
  stake: number;
}

const initialState: BasketState = {
  selections: {},
  stake: 1,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<Selection>) => {
      const selection = action.payload;
      const existing = state.selections[selection.key];
      if (existing && existing.outcomeId === selection.outcomeId) {
        delete state.selections[selection.key];
      } else {
        state.selections[selection.key] = selection;
      }
    },
    removeSelection: (state, action: PayloadAction<string>) => {
      delete state.selections[action.payload];
    },
    clearBasket: (state) => {
      state.selections = {};
    },
    setStake: (state, action: PayloadAction<number>) => {
      state.stake = action.payload;
    },
  },
});

export const { toggleSelection, removeSelection, clearBasket, setStake } = basketSlice.actions;
export default basketSlice.reducer;

export const selectSelections = (state: RootState) => state.basket.selections;
export const selectStake = (state: RootState) => state.basket.stake;

// Lets a single odd button check "am I selected?" without re-rendering on
// every basket change elsewhere - only this match+market slot is read.
export const selectOutcomeIdFor = (key: string) => (state: RootState) =>
  state.basket.selections[key]?.outcomeId;

export const selectSelectionList = createSelector(selectSelections, (selections) =>
  Object.values(selections),
);

export const selectCombinedOdds = createSelector(selectSelectionList, (list) =>
  list.reduce((total, selection) => total * selection.odd, 1),
);

export const selectPotentialPayout = createSelector(
  selectCombinedOdds,
  selectStake,
  (combinedOdds, stake) => combinedOdds * stake,
);
