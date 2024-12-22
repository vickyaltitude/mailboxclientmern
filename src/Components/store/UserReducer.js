import { createSlice } from "@reduxjs/toolkit";

const userAuthInitialState={
    isLoggedIn: false,
    currentUserToken: null,
    currentUserEmail: null
}

const userReducer = createSlice({
    initialState: userAuthInitialState,
    name: 'userauth',
    reducers:{
        setIsLoggedIn(state){
           state.isLoggedIn = true;
        },
        setCurrentUserToken(state,action){
            state.currentUserToken = action.payload
        },
        setCurrentUserEmail(state,action){
            state.currentUserEmail = action.payload
        }
    }
})

export const userReducerAction = userReducer.actions;
export default userReducer.reducer