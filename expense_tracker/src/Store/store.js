import {configureStore, createSlice} from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        token: null,
        userId: null,
    },
    reducers: {
        login: (state,action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout: (state) =>{
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
        }
    }
});
 export const {login, logout} = authSlice.actions;
 export const authReducer = authSlice.reducer;

 const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expense: [],
    },
    reducers: {
        addExpense: (state, action) =>{
            state.expense.push(action.payload);
        },
        setExpense:(state, action)=>{
            state.expense = action.payload;
        },
    },
 });

 export const {addExpense, setExpense} = expenseSlice.actions;
 export const expenseReducer = expenseSlice.reducer;

const store = configureStore({
 reducer: {
    auth: authReducer,
    expense: expenseReducer,
 },
});

export default store;