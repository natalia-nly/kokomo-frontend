import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth/auth-service";
import ProfileService from "../../services/profile/profile-service"

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
    console.log(e.target.messageId.value)
      profileService.deleteMessage(e.target.messageId.value)
      .then((response) => {
        console.log(response);
      });
    
  };



  let allMessages = <p>No tienes Notificaciones pendientes</p>;
  if (state.messages.length) {
    allMessages = state.messages.map((message, index) => (

        <div className="comment-kokomo pb-4 pt-4" key={index}>
          <h5>
            <img
              src={message.avatar}
              alt="Avatar"
              style={{
                width: "30px",
                borderRadius: "100px",
                marginRight: "10px",
              }}
            />{" "}
            {message.fromUser}
          </h5>
          <h4>Tema: {message.topic}</h4>
          <p>{message.message}</p>{" "}
            <form onSubmit={deleteMessage}  className="btn-kokomo btn-kokomo-danger mr-3 mb-4">
            <input type="hidden" value={message._id} name="messageId"/>    
              <button className="link-danger">
                <i className="far fa-trash-alt"></i>
              </button>
            </form>
        </div>
    ));
  }

  return <div>{allMessages}</div>;
};

export default Messages;
