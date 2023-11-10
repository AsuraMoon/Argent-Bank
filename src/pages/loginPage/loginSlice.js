import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isAuth: false,
  isRemember: false,
  error: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logingPending: (state) => {
      state.isLoading = true
    },
    logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
    },
    logingError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    logingOut: (state) => {
      state.isAuth = false
    },
  },
})
const { actions, reducer } = loginSlice
export const {
  logingPending,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember,
} = actions
export default reducer
