const todoMasterDataService = require('../services/todoMasterDataService');

const TodoMasterController = {
    
    getTodoMasterData: async (req, res) => {
        try {
            const { pageIndex = 0, pageSize = 10, searchParam = '' } = req.query;
            const todoData = await todoMasterDataService.getTodoMasterData(
                parseInt(pageIndex),
                parseInt(pageSize),
                searchParam
            );
            return res.status(200).json({ success: true, data: todoData });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error fetching todo data',
                error: error.message 
            });
        }
    },

    addUpdateDeleteTodoMasterData: async (req, res) => {
        try {
            const { action, ...todoData } = req.body;
            console.log(req.body,"--->")
            const result = await todoMasterDataService.addUpdateDeleteTodoMasterData(action, todoData);
            return res.status(200).json({ success: true, message: result });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error processing todo data',
                error: error.message 
            });
        }
    }
};

module.exports = TodoMasterController;