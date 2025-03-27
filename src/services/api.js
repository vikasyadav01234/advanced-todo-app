const BASE_URL = 'https://api.freeapi.app/api/v1/todos';

export const todoApi = {
  async getAllTodos() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch todos');
      return data.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch todos');
    }
  },

  async createTodo(todo) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to create todo');
      return data.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create todo');
    }
  },

  async deleteTodo(todoId) {
    try {
      console.log('Deleting todo with ID:', todoId);
      
      const response = await fetch(`${BASE_URL}/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete todo');
      }

      return data.data;
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  },


  async updateTodo(todoId, updates) {
    try {
      const response = await fetch(`${BASE_URL}/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to update todo');
      return data.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update todo');
    }
  }
};