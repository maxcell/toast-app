import React, { useState, useEffect, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

const anchorObjs = {
  TOP_LEFT: {
    horizontal: "left",
    vertical: "top"
  },
  TOP_CENTER: {
    horizontal: "center",
    vertical: "top"
  },
  TOP_RIGHT: {
    horizontal: "right",
    vertical: "top"
  },
  BOTTOM_LEFT: {
    horizontal: "left",
    vertical: "bottom"
  },
  BOTTOM_CENTER: {
    horizontal: "center",
    vertical: "bottom"
  },
  BOTTOM_RIGHT: {
    horizontal: "right",
    vertical: "bottom"
  }
};

/**
 * Returns the notification onto the page.
 * @param props
 * @param props.text {string} - text that is displayed for the user
 * @param props.status {'success' | 'error' | 'warning' | 'info} - what styles it should take on as well as handles aria-labels
 * @param props.location {'TOP_LEFT' |'TOP_CENTER' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_CENTER' | 'BOTTOM_RIGHT'} - where it should be rendered onto the page.
 */
const Notification = ({ text, status, location }) => {
  const [open, setOpen] = useState(true);

  function anchorOrigin(anchor_string) {
    return anchorObjs[anchor_string] || anchorObjs["BOTTOM_CENTER"];
  }

  return (
    <Snackbar
      anchorOrigin={anchorOrigin(location)}
      open={open}
      autoHideDuration={1000} // Automatically calls onClose after 1000ms (1sec)
      onClose={() => setOpen(false)}
    >
      <Alert variant="filled" severity={status}>
        {text}
      </Alert>
    </Snackbar>
  );
};

// Create our context for notifications
const NotificationContext = React.createContext();

// Location on the dom where we want to put all of our notifications
const NotificationContainer = props => <div {...props} />;

export function NotificationProvider({ children }) {
  const initialState = {
    notifications: []
  };

  const [notifications, setNotifications] = useState(
    initialState.notifications
  );

  // Manages deleting all notifications after 10seconds from the last prop update
  // Will only delete notification if there are any present.
  useEffect(() => {
    let deleteMessagesTimeout;
    if (notifications.length > 0) {
      deleteMessagesTimeout = setTimeout(() => {
        setNotifications([]);
      }, 10000);
    }

    return () => clearTimeout(deleteMessagesTimeout);
  }, [notifications]);

  const add = (text, status = "info", location = "BOTTOM_CENTER") => {
    const notification = { text, status, location };
    setNotifications([...notifications, notification]);
  };

  return (
    <NotificationContext.Provider value={{ add }}>
      {children}
      <NotificationContainer>
        {notifications.map(({ text, status, location, ...rest }, index) => (
          <Notification
            key={index}
            {...rest}
            text={text}
            location={location}
            status={status}
          />
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
