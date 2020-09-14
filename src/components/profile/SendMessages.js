import React, { useState } from "react";
import ProfileService from "../../services/profile/profile-service";
import { Link } from "react-router-dom";

const service = new ProfileService();

const SendMessages = (props) => {
  console.log(props);
  let initialState = {
    topic: "Cancelación reserva " + props.booking.bookingRef,
    message: "",
    hideForm: false,
  };
  const [state, setState] = useState(initialState);

  let message = <></>;

  const handleChange = (event) => {
    console.log(state);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleMessage = (e) => {
    e.preventDefault();
    let body = {
      fromUser: props.user,
      topic: state.topic,
      message: state.message,
      avatar: props.user.avatar,
    };
    // axios
    //     .post(process.env.REACT_APP_API_URL + "/profile/send-message/" + state.customer, body, {withCredentials: true})
    service.sendMessage(props.customer, body).then((response) => {
      console.log("Mensaje enviado", response);
      setState({
        ...state,
        topic: "",
        message: "",
      });
      if (props.delete) {
        props.delete(props.booking.bookingId);
      }
    });
  };

  const hideForm = () => {
    setState({ ...state, hideForm: true });
  };

  if (!state.hideForm) {
    message = (
      <div className="text-center d-flex align-items-center justify-content-center kokomo-popup">
        <div className="row align-middle justify-content-center w-100">
          <div className="col-md-4 align-self-center fondo-kokomo">
            <img
              src="/images/warn.png"
              className="emoji-img"
              alt="Horas disponibles"
            />
            <button onClick={hideForm} className="close-btn">
              <i className="fas fa-times"></i>
            </button>
            <p className="mb-4">
                Avisa a tu cliente de que tienes que cancelar su reserva.
            </p>
            <form onSubmit={handleMessage}>
              <div className="form-group">
                <label htmlFor="topic" className="label active">
                  Tema
                </label>
                <input
                  type="text"
                  name="topic"
                  value={state.topic}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="label active">
                  Tu mensaje
                </label>
                <input
                  type="text"
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                />
              </div>
              <div>
                {" "}
                <input
                  type="submit"
                  value="Enviar"
                  className="btn-kokomo btn-kokomo-success w-100"
                  style={{
                    padding: "19px",
                  }}
                />{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{message}</>;
};

export default SendMessages;
