const express = require('express');
const router = express.Router();
const TodoMasterController = require('../controllers/TodoMasterController');

// Get todo data with pagination and search
router.get('/getTodoMasterData', TodoMasterController.getTodoMasterData);

// Add, update, or delete todo
router.post('/addUpdateDeleteTodoMasterData', TodoMasterController.addUpdateDeleteTodoMasterData);

module.exports = router;