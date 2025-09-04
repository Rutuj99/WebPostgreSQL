import { configureStore } from '@reduxjs/toolkit';
import todoMasterReducer from './todoMaster/todoMasterSlice';

export const store = configureStore({
  reducer: {
    todoMaster: todoMasterReducer,
  },
});

export default store;