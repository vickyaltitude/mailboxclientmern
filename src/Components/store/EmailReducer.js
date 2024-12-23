import { createSlice } from "@reduxjs/toolkit";

const emailsInitialState = {
    emails:[]
}

const emailReducer = createSlice({
   initialState: emailsInitialState,
   name: 'emailreducer',
   reducers:{
      setEmails(state,action){
         console.log(action.payload)
           state.emails = action.payload
      }
   }
})

export const emailReducerAction = emailReducer.actions;

export default emailReducer.reducer;