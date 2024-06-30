import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

const { setUser, removeUser } = userSlice.actions

export const initialiseUser = () => {
  return (dispatch) => {
    const savedUser = window.localStorage.getItem("loggedUser")
    if (savedUser) {
      const currentUser = JSON.parse(savedUser)
      dispatch(setUser(currentUser))
      blogService.setToken(currentUser.token)
    }
  }
}

export const logIn = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.logIn({ username, password })
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedUser")
    blogService.removeToken()
    dispatch(removeUser())
  }
}

export default userSlice.reducer