import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../src/pages/loginPage/loginSlice'
import profileReducer from '../src/pages/profilePage/profileSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
})

export default store
