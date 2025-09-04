import React, { useState, useEffect } from 'react';

const TodoForm = ({ todo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    todoTitle: '',
    todoDescription: '',
    priority: 1,
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        todoTitle: todo.TodoTitle || '',
        todoDescription: todo.TodoDescription || '',
        priority: todo.Priority || 1,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      action: todo ? 'UPDATE' : 'INSERT',
      ...formData,
      createdBy: todo ? undefined : 'User',
      updatedBy: todo ? 'User' : undefined,
    };

    if (todo) {
      submitData.todoId = todo.TodoId;
    }

    onSubmit(submitData);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>{todo ? 'Edit Todo' : 'Add New Todo'}</h2>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="todoTitle">Title *</label>
            <input
              type="text"
              id="todoTitle"
              name="todoTitle"
              value={formData.todoTitle}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="todoDescription">Description</label>
            <textarea
              id="todoDescription"
              name="todoDescription"
              value={formData.todoDescription}
              onChange={handleChange}
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {todo ? 'Update' : 'Add'} Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;