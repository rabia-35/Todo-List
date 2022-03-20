import { configureStore } from "@reduxjs/toolkit";
import todoSlice  from "./todoState/todoStateSlice"

export const store=configureStore({
    reducer:{
       todos:todoSlice,
    },
})
export default store;