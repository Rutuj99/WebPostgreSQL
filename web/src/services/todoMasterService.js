import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodoMasterData = async (pageIndex = 0, pageSize = 10, searchParam = '') => {
  try {
    const response = await api.get('/getTodoMasterData', {
      params: { pageIndex, pageSize, searchParam }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUpdateDeleteTodoMasterData = async (todoData) => {
  try {
    const response = await api.post('/addUpdateDeleteTodoMasterData', todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};