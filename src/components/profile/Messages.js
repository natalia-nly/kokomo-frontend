import React, { useState, useEffect } from "react";
import AuthService from "../../auth/auth-service";
import SendMessages from "./SendMessages"
const service = new AuthService();


var initialState = {
  messages: [],

};
var writeMessage=<></>

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
  


  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log('enviar mensaje');
    const client = event.target.customer.value;
    console.log(client)
    writeMessage=

      <SendMessages customer={client} user={state.user} />

    setState({
        ...state,
        messages:true
    });
}


  var allMessages = <p>No tienes mensajes</p>;
  if (state.messages.length) {
    allMessages = state.messages.map((message, index) => (
<>
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
       <div>    
      <form onSubmit={handleSubmit}>
                    <input type="hidden" name="customer" value={message.refUser[0]}/>
                    <button className="kokomo-btn-form p-2">Enviar mensaje</button>
                </form>
            

                </div> 
                </div>
                {writeMessage}
                </>

    ));
  }

  return <div>{allMessages}</div>;
};

export default Messages;
