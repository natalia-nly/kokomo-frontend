import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth/auth-service";
import Badge from "react-bootstrap/Badge";
import ProfileService from "../../services/profile/profile-service";

const profileService = new ProfileService();
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

  const deleteMessage = (e) => {
    console.log(e.target.messageId.value);
    profileService.deleteMessage(e.target.messageId.value).then((response) => {
      console.log(response);
    });
  };

  let allMessages = (
    <div className="text-center">
      <img
        src="/images/bell-muted.png"
        className="black-white"
        alt="Sin notificaciones"
      />
      <p>No tienes notificaciones pendientes</p>
    </div>
  );
  if (state.messages.length) {
    allMessages = state.messages.map((message, index) => (
      <div className="border-top pb-3 pt-3" key={index}>
        <form onSubmit={deleteMessage} className="float-right">
          <input type="hidden" value={message._id} name="messageId" />
          <button className="close-btn-2">
            <i className="fas fa-times"></i>
          </button>
        </form>
        <Badge variant="info">{message.topic}</Badge>
        <p>{message.message}</p>
      </div>
    ));
  }

  return <div>{allMessages}</div>;
};

export default Messages;
