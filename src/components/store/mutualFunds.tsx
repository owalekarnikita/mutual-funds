import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  sortCriteria: '',
};

const mutualFundsSlice = createSlice({
  name: 'mutualFunds',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortCriteria(state, action) {
      state.sortCriteria = action.payload;
    },
  },
});

export const { setSearchQuery, setSortCriteria } = mutualFundsSlice.actions;

export default mutualFundsSlice.reducer;