import React, {useState} from "react";
import axios from "axios";
import ProfileService from "../../services/profile/profile-service"

const service = new ProfileService();
let initialState = {
    message: ""
};

const SendMessages = (props) => {

console.log(props)
    const [state,
        setState] = useState(initialState);

    const handleChange = (event) => {
      console.log(state);
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleMessage = (e) => {
        e.preventDefault();
        let body = {
            fromUser: props.user,
            topic: state.topic,
            message: state.message,
            avatar:props.user.avatar,
        };
        // axios
        //     .post(process.env.REACT_APP_API_URL + "/profile/send-message/" + state.customer, body, {withCredentials: true})
        service.sendMessage(props.customer,body)
            .then((response) => {
                console.log("Mensaje enviado", response);
                setState({
                    ...state,
                    topic:"",
                    message: ""
                });
                if (props.delete) {
                    props.delete(props.booking.bookingId);
                }
            });
    };

    let message = (
        <div>
            <form onSubmit={handleMessage} className="d-flex mt-2">
                <div
                    className="form-group"
                    style={{
                    width: "70%"
                }}>
                    <label htmlFor="topic" className="label active">
                        Tema
                    </label>{" "}
                    <input type="text" name="topic" value={state.topic} onChange={handleChange}/>{" "}
                </div>
                <div
                    className="form-group"
                    style={{
                    width: "70%"
                }}>
                    <label htmlFor="message" className="label active">
                        {" "}
                        Tu mensaje{" "}
                    </label>
                    <input
                        type="text"
                        name="message"
                        value={state.message}
                        onChange={handleChange}/>{" "}
                </div>{" "}
                <div style={{
                    width: "30%"
                }}>
                    {" "}
                    <input
                        type="submit"
                        value="Enviar"
                        className="btn-kokomo-flex"
                        style={{
                        padding: "19px"
                    }}/>{" "}
                </div>
            </form>
        </div>
    );

    return ( <> {
        " "
    } < div > <div>
        <div>
            <i className="fas fa-envelope-open-text"></i>
            {message}
        </div>
    </div> < /div>{" "}
    </ >);
};

export default SendMessages;
