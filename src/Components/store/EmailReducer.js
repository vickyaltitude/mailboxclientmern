import { createSlice } from "@reduxjs/toolkit";

const emailsInitialState = {
    emails:[],
    sentEmails:[]
}

const emailReducer = createSlice({
   initialState: emailsInitialState,
   name: 'emailreducer',
   reducers:{
      setEmails(state,action){
        
           state.emails = action.payload
      },
      setSentEmails(state,action){
         state.sentEmails = action.payload
      }
   }
})

export const emailReducerAction = emailReducer.actions;

export default emailReducer.reducer;