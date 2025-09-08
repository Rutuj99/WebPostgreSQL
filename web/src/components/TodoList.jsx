import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoMasterData, addUpdateDeleteTodo } from '../store/todoMasterSlice';
import TodoForm from './TodoForm';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todoMasterData, loading, totalCount, currentPage, pageSize } = useSelector(
    (state) => state.todoMaster
  );
  
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTodoMasterData({ 
      pageIndex: currentPage - 1, 
      pageSize, 
      searchParam: searchTerm 
    }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleSearch = () => {
    dispatch(fetchTodoMasterData({ 
      pageIndex: 0, 
      pageSize, 
      searchParam: searchTerm 
    }));
  };

  const handleAddTodo = () => {
    setEditTodo(null);
    setShowForm(true);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setShowForm(true);
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await dispatch(addUpdateDeleteTodo({
        action: 'DELETE',
        todoId,
        updatedBy: 'User'
      }));
      dispatch(fetchTodoMasterData({ 
        pageIndex: currentPage - 1, 
        pageSize, 
        searchParam: searchTerm 
      }));
    }
  };

  const handleFormSubmit = async (todoData) => {

    console.log("-->2",todoData);
    await dispatch(addUpdateDeleteTodo(todoData));
    setShowForm(false);
    dispatch(fetchTodoMasterData({ 
      pageIndex: currentPage - 1, 
      pageSize, 
      searchParam: searchTerm 
    }));
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Unknown';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 1: return 'priority-low';
      case 2: return 'priority-medium';
      case 3: return 'priority-high';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo Master</h1>
        <div className="todo-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
          <button onClick={handleAddTodo} className="add-btn">
            Add Todo
          </button>
        </div>
      </div>

      <div className="todo-list">
        {todoMasterData && todoMasterData.length > 0 ? (
          todoMasterData.map((todo) => (
            <div key={todo.TodoId} className="todo-item">
              <div className="todo-content">
                <h3 className="todo-title">{todo.TodoTitle}</h3>
                <p className="todo-description">{todo.TodoDescription}</p>
                <div className="todo-meta">
                  <span className={`priority ${getPriorityClass(todo.Priority)}`}>
                    {getPriorityLabel(todo.Priority)}
                  </span>
                  <span className="created-date">Created: {todo.CreatedDate}</span>
                  <span className="created-by">By: {todo.CreatedBy}</span>
                </div>
              </div>
              <div className="todo-actions">
                <button 
                  onClick={() => handleEditTodo(todo)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteTodo(todo.TodoId)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-todos">No todos found.</div>
        )}
      </div>

      {totalCount > 0 && (
        <div className="pagination">
          <span>Total: {totalCount} items</span>
        </div>
      )}

      {showForm && (
        <TodoForm
          todo={editTodo}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TodoList;