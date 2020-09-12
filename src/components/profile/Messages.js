import React, {useState, useEffect} from "react";
import AuthService from "../../auth/auth-service";
import SendMessages from "./SendMessages"
const service = new AuthService();

let initialState = {
    messages: []
};


const Messages = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    service.loggedin().then((response) => {
      console.log(response.messages)
        setState({
            ...state,
            user: response,
            messages:response.messages,
            message:false
           
        });
      });
  }, []);
  



  let allMessages = <p>No tienes Notificaciones pendientes</p>;
if (state.messages.length) {
    allMessages = state
        .messages
        .map((message, index) => ( <> <div className="comment-kokomo pb-4 pt-4" key={index}>
            <h5>
                <img
                    src={message.avatar}
                    alt="Avatar"
                    style={{
                    width: "30px",
                    borderRadius: "100px",
                    marginRight: "10px"
                }}/>{" "} {message.fromUser}
            </h5>
            <h4>Tema: {message.topic}</h4>
            <p>{message.message}</p>{" "}
        </div> < />

    ));
  }

  return <div>{allMessages}</div>;
    };

  export default Messages;
