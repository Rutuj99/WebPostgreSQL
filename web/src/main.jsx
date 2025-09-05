import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoList from './components/TodoList'
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <TodoList/>
  </Provider>
)
