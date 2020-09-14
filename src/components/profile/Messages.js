import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth/auth-service";
import Badge from 'react-bootstrap/Badge'
const service = new AuthService();

let initialState = {
  messages: [],
};

const Messages = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    service.loggedin().then((response) => {
      console.log(response.messages);
      if (response.messages) {
        setState({
          ...state,
          user: response,
          messages: response.messages,
          message: false,
        });
      }
    });
  }, []);

  let allMessages = <p>No tienes Notificaciones pendientes</p>;
  if (state.messages.length) {
    allMessages = state.messages.map((message, index) => (

        <div className="border-top pb-3 pt-3" key={index}>
          <Badge variant="info">{message.topic}</Badge>
          <p>{message.message}</p>
        </div>
    ));
  }

  return <div>{allMessages}</div>;
};

export default Messages;
