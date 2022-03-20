import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getTodosAsync= createAsyncThunk("todos/getTodosAsync", async ()=>{
    const res=await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data
})
export const addTodoAsync=createAsyncThunk("todos/addTodoAsync", async (todo)=>{
    const res= await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, todo);
    return res.data
})

export const todoSlice=createSlice({
    name:"todos",
    initialState:{
        items:[],
        isLoading:false,
        addTodoIsLoading:false,
        error:null,
        addTodoError:null,
        activeFilter:"All"
    },
    reducers:{
        toggle:(state, action)=>{
            const id=action.payload;
            const item= state.items.find(todo=> todo.id===id)
            item.completed=!item.completed
         },
         destroy:(state, action)=>{
             const id=action.payload;
             state.items= state.items.filter(todo=> todo.id!==id)
            
             
         },
         
         changeActiveFilter:(state, action)=>{
             state.activeFilter=action.payload;
            },
        clearCompleted: (state)=>{
            const filtered=state.items.filter(item =>
                item.completed === false
            )
            state.items=filtered
        }
        
    },
    extraReducers:{
        [getTodosAsync.pending]:(state)=>{
            state.isLoading=true;
        },
        [getTodosAsync.fulfilled]:(state, action)=>{
            state.isLoading=false;
            state.items=action.payload;
        },
        [getTodosAsync.rejected]:(state, action)=>{
            state.isLoading=false;
            state.error=action.error.message
        },
        [addTodoAsync.pending]:(state)=>{
            state.addTodoIsLoading=true;
        },
        [addTodoAsync.fulfilled]:(state, action)=>{
            state.addTodoIsLoading=false;
            state.items.push(action.payload);
        },
        [addTodoAsync.rejected]:(state, action)=>{
            state.addTodoIsLoading=false;
            state.addTodoError=action.error.message;
        }
    }
})
export const selectTodos=((state)=>state.todos.items)
export const {  toggle, destroy, changeActiveFilter, clearCompleted}= todoSlice.actions;
export default todoSlice.reducer