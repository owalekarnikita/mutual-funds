import { configureStore } from '@reduxjs/toolkit';
import mutualFundsReducer from './mutualFunds';

const store = configureStore({
  reducer: {
    mutualFunds: mutualFundsReducer,
  },
});

export default store;
