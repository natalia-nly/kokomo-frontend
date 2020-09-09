import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Booking from "./Booking"
import axios from "axios";
const initialState = {
    bookings: [],
    properties:[]
}
let reservas = <p>Todavía no tienes reservas</p>

const Profile = (props) => {
    console.log("estamos en profile");

    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/booking/my-bookings", {withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET mis reservas", response.data.bookings);
                setState({
                    ...state,
                    bookings: response.data.bookings
                });
            }); 
            axios
            .get(process.env.REACT_APP_API_URL + "/booking/my-properties-bookings", {withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET bookings en mis props:", response.data.bookings);
                setState({
                    ...state,
                    properties: response.data.bookings
                });
            }); 
    }, []);

    const refreshPage = () => {
        window
            .location
            .reload(false);
    }

    const deleteBooking = (event) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + "/booking/delete/" + event.target.bookingId.value, {}, {withCredentials: true}).then((response) => {
            console.log(response.data)
            refreshPage()

        });
    };
   

    if (state.bookings.length) {
        console.log(state.bookings)
        reservas = state
            .bookings
            .map((booking,index) => <Booking key ={index} booking={booking} delete={deleteBooking}/>)
    }

    return (
        <div>
            <div className="beach-background">
                <div className="text-right">
                    <Link to="/profile/edit" className="btn-kokomo btn-kokomo-grey mr-3">
                        Configuración
                    </Link>
                    <Link to="/logout" className="btn-kokomo btn-kokomo-danger">
                        Cerrar sesión
                    </Link>
                </div>
            </div>

            <div
                className="text-center"
                style={{
                borderRadius: "30px",
                marginTop: "-30px",
                backgroundColor: "white",
                paddingBottom: "30px"
            }}>
                <img src={props.loggedInUser.avatar} alt="Avatar" className="avatar"/>

                <h2>Hola {props.loggedInUser.username}!</h2>
                <p>email: {props.loggedInUser.email}</p>
                <p>Número de teléfono: {props.loggedInUser.telNumber}</p>
            </div>
            <div className="body-container">
                <div className="row">
                    <div className="col">
                        <Link to="/search" className="btn-kokomo btn-kokomo-success float-right">
                            Crear una nueva reserva
                        </Link>
                        <div className="col">
                        <Link
                            to="/property/create-property"
                            className="btn-kokomo btn-kokomo-success float-right">
                            Crear un nuevo local
                        </Link>
                    </div>
                    </div>
                </div>
                <h4 className="section-title">
                    Tus Reservas</h4>
                {reservas}
            </div>
            <div className="body-container">
                <div className="row">
                    <div className="col">
                        <Link
                            to="/property/create-property"
                            className="btn-kokomo btn-kokomo-success float-right">
                            Crear un nuevo local
                        </Link>
                    </div>
                </div>
                <h4 className="section-title">
                    Tus Locales</h4>
            </div>
        </div>
    );
};

export default Profile;
