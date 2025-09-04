const pool = require('./database');

const todoMasterDataService = {
    getTodoMasterData: async (pageIndex = 0, pageSize = 10, searchParam = '') => {
        try {
            const query = 'SELECT * FROM fo_get_todo_masterdata_list($1, $2, $3)';
            const values = [pageIndex, pageSize, searchParam];
            const result = await pool.query(query, values);
            return result.rows[0]?.todomasterlist || [];
        } catch (error) {
            throw error;
        }
    },

    addUpdateDeleteTodoMasterData: async (action, data) => {
        try {
            const query = 'SELECT fo_insert_update_delete_todomasterdata($1, $2, $3, $4, $5, $6, $7) as result';
            const values = [
                action,
                data.todoId || null,
                data.todoTitle || null,
                data.todoDescription || null,
                data.priority || null,
                data.createdBy || null,
                data.updatedBy || null
            ];
            const result = await pool.query(query, values);
            return result.rows[0].result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = todoMasterDataService;