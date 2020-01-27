import React from "react";
import "./App.css";

import { NotificationProvider, useNotifications } from "./notification-context";

function App() {
  return (
    <NotificationProvider>
      <InfoToastButton text="Worked!" location="BOTTOM_LEFT">
        Bottom Left
      </InfoToastButton>
      <SuccessToastButton text="Success" location="BOTTOM_CENTER">
        Bottom Center
      </SuccessToastButton>

      <ErrorToastButton text="Worked!" location="BOTTOM_RIGHT">
        Bottom Right
      </ErrorToastButton>
    </NotificationProvider>
  );
}

function ToastButton(props) {
  const { children, text, location, status } = props;
  const { add } = useNotifications();
  return (
    <button onClick={() => add(text, status, location)}>{children}</button>
  );
}

/* Specializations of ToastButtons */
function SuccessToastButton(props) {
  return <ToastButton status="success" {...props} />;
}

function WarningToastButton(props) {
  return <ToastButton status="warning" {...props} />;
}

function ErrorToastButton(props) {
  return <ToastButton status="error" {...props} />;
}

function InfoToastButton(props) {
  return <ToastButton status="info" {...props} />;
}

export default App;
