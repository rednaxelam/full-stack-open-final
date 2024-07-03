import { useSelector } from "react-redux"

const OutcomeMessage = () => {
  const notificationObject = useSelector((state) => state.notification)
  if (!notificationObject.content) return null

  let style = undefined

  if (notificationObject.outcome === "success") {
    style = {
      color: "DarkGreen",
      backgroundColor: "LightGray",
      border: "Green 3px solid",
      borderRadius: "5px",
      fontSize: "16px",
      padding: "10px",
      width: "100%",
      textAlign: "center",
    }
  } else if (notificationObject.outcome === "failure") {
    style = {
      color: "Red",
      backgroundColor: "LightGray",
      border: "Red 3px solid",
      borderRadius: "5px",
      fontSize: "16px",
      padding: "10px",
      width: "100%",
      textAlign: "center",
    }
  } else {
    style = {
      color: "Black",
      backgroundColor: "LightGray",
      border: "Black 3px solid",
      borderRadius: "5px",
      fontSize: "16px",
      padding: "10px",
      width: "100%",
      textAlign: "center",
    }
  }

  return <p style={style}>{notificationObject.content}</p>
}

export default OutcomeMessage
