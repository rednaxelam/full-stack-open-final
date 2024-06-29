import { createSlice } from "@reduxjs/toolkit"

const initialState = { content: "", timeOutId: null, outcome: null }

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    removeNotification(state, action) {
      return { content: "", timeOutId: null, outcome: null }
    },
    setNotificationContent(state, action) {
      clearTimeout(state.timeOutId)
      return {
        content: action.payload[1],
        timeOutId: null,
        outcome: action.payload[0],
      }
    },
    addNotificationTimeOutId(state, action) {
      return { ...state, timeOutId: action.payload }
    },
  },
})

const { removeNotification, setNotificationContent, addNotificationTimeOutId } =
  notificationSlice.actions

export const createNotification = (notificationObject, seconds = 5) => {
  return (dispatch) => {
    dispatch(setNotificationContent(notificationObject))
    const timeOutId = setTimeout(
      () => dispatch(removeNotification()),
      seconds * 1000,
    )
    dispatch(addNotificationTimeOutId(timeOutId))
  }
}

export default notificationSlice.reducer
