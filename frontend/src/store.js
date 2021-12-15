import thunk from 'redux-thunk';
import feedbackReducer from './reducers/feedbacks';
import userReducer from './reducers/user'
import messageReducer from './reducers/message';
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    feedbacks: feedbackReducer, 
    user: userReducer,
    message: messageReducer
  },
  middleware: [thunk]
})

export default store

