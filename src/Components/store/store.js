import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserReducer'
import emailReducer from './EmailReducer';

const store = configureStore({
    reducer : {userReducer: userReducer,emailReducer: emailReducer}
})

export default store;