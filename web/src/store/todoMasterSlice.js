import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodoMasterData, addUpdateDeleteTodoMasterData } from '../../services/todoMasterService';

const initialState = {
  todoMasterData: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  searchParam: '',
  loading: false,
  error: null,
};

// Async thunks
export const fetchTodoMasterData = createAsyncThunk(
  'todoMaster/fetchTodoMasterData',
  async ({ pageIndex, pageSize, searchParam }) => {
    const response = await getTodoMasterData(pageIndex, pageSize, searchParam);
    return response.data;
  }
);

export const addUpdateDeleteTodo = createAsyncThunk(
  'todoMaster/addUpdateDeleteTodo',
  async (todoData) => {
    const response = await addUpdateDeleteTodoMasterData(todoData);
    return response;
  }
);

const todoMasterSlice = createSlice({
  name: 'todoMaster',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    setPagination: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
    },
    resetTodoMaster: (state) => {
      state.todoMasterData = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.searchParam = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoMasterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoMasterData.fulfilled, (state, action) => {
        state.loading = false;
        state.todoMasterData = action.payload || [];
        state.totalCount = action.payload?.[0]?.totalresultcount || 0;
      })
      .addCase(fetchTodoMasterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUpdateDeleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUpdateDeleteTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUpdateDeleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchParam, setPagination, resetTodoMaster } = todoMasterSlice.actions;
export default todoMasterSlice.reducer;