import { configureStore } from '@reduxjs/toolkit';
import todoMasterReducer from './todoMasterSlice';

export const store = configureStore({
  reducer: {
    todoMaster: todoMasterReducer,
  },
});

export default store;