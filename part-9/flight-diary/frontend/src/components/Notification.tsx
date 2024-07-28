export interface NotificationObject {
  message: string;
  outcome: 'success' | 'failure' | 'other';
}

interface NotificationProps {
  notificationObject: NotificationObject;
}

const Notification = (props: NotificationProps): JSX.Element => {
  const { notificationObject } = props;
  const { message, outcome } = notificationObject;

  if (message === '') return <></>;

  let style: React.CSSProperties;

  if (outcome === "success") {
    style = {
      color: "DarkGreen",
      backgroundColor: "LightGray",
      border: "Green 3px solid",
      borderRadius: "5px",
      fontSize: "16px",
      padding: "10px",
      width: "100%",
      textAlign: "center",
    };
  } else if (outcome === "failure") {
    style = {
      color: "Red",
      backgroundColor: "LightGray",
      border: "Red 3px solid",
      borderRadius: "5px",
      fontSize: "16px",
      padding: "10px",
      width: "100%",
      textAlign: "center",
    };
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
    };
  }

  return <p style={style}>{message}</p>;
};

export default Notification;