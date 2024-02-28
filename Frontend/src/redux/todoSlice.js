import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
async()=>{
    const response = await fetch('https://localhost:7170/todos');
    if(response.ok){
        const todos = await response.json();
        return { todos };
    }
}
);

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(payload) => {
    const response = await fetch('https://localhost:7170/todos', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:uuidv4(), title: payload.title ,completed: false })
})
if (response.ok){
    const todo= await response.json()
    return { todo };
}
});

export const toggleCompleteAsync = createAsyncThunk('todos/completeTodoAsync', async(payload)=>{
    const response = await fetch(`https://localhost:7170/todos/${payload.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({completed: payload.completed})
    })
if (response.ok){
    const todo= await response.json()
    return { id: payload.id, completed: todo.completed };
}
});

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://localhost:7170/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const editTodoAsync = createAsyncThunk(
    'todos/editTodoAsync',
    async (payload) => {
        const response = await fetch(`https://localhost:7170/todos/${payload.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: payload.title }),
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            return updatedTodo;
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: [
        {}
    ],
    // no API
    // reducers:{
    //     addTodo: (state, action) => {
    //         const newTodo = {
    //             id: Date.now(),
    //             title: action.payload.title,
    //             completed: false
    //         };
    //         state.push(newTodo)
    //     },

    //     toggleComplete: (state, action) => {
    //         const index = state.findIndex((todo)=> todo.id === action.payload.id);
    //         state[index].completed = action.payload.completed;
    //     },

    //     deleteTodo: (state, action) => {
    //       return state.filter((todo)=> todo.id !== action.payload.id);

    //     }
    // },
    extraReducers:{
        [getTodosAsync.pending]: (state,action)=>{
            console.log('fetching')
        },
        [getTodosAsync.fulfilled]: (state,action) =>{
            console.log('fetched')

            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]:(state,action)=> {
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]:(state,action)=>{
            const index = state.findIndex((todo)=> todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]:(state,action)=>{
            return state.filter((todo)=> todo.id !== action.payload.id);
        },
        [editTodoAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);

            // state[index] = action.payload;
            state[index].title = action.payload.title;
        }
    }
});

export const { addTodo , toggleComplete , deleteTodo , getCount } = todoSlice.actions;

export default todoSlice.reducer;