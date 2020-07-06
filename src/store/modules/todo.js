import axios from "axios";

export default {
    actions: {
        async getRequestTodos(ctx) {
            try {
                const response = await axios.get("http://localhost:3003/api/todos/", { 
                  params: {
                      author_id: '1'
                    }
                  });

                ctx.commit('updateTodos', response.data);

            } catch (error) {
                console.error(error);
            }
        },
        async addNewTodo(ctx, newTodo) {
            try {
                await axios.post("http://localhost:3003/api/todos/", {
                    author_id: 1,
                    title: newTodo.title,
                    description: newTodo.description,
                    status: newTodo.status
                  })
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTodo(ctx, todo_id) {
            try {
                await axios.delete(`http://localhost:3003/api/todos/${todo_id}`)
            } catch (error) {
                console.error(error);
            }
        },
    },
    mutations: {
        updateTodos(state, todos) {
            state.todos = todos;
        }
    },
    state: {
        todos: [
            {
                "todo_id": 3,
                "author_id": 1,
                "title": "First LOREM ToDo",
                "description": "This is firs todo description",
                "date_create": "2020-07-02T05:22:09.861Z",
                "status": false
            }
        ]
    },
    getters: {
        allTodos(state) {
            return state.todos;
        }
    }
}