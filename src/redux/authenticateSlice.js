import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin: (state,action) => {
      state.token = action.payload
    },
    isLogOut: (state) => {
      state.token = ""
    },
  },
})

export const { isLogin, isLogOut } = counterSlice.actions

export default counterSlice.reducer