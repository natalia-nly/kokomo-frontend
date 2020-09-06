import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Booking from "./Booking"
import axios from "axios";
const initialState ={
    bookings:[]
}
let reservas = <p>Todavía no tienes reservas</p> 

const Profile = (props) => {
    console.log("estamos en profile");
    

    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/booking/my-bookings",{
                withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET", response);
                setState({
                    ...state,
                    bookings: response.data.bookings
                });
            });
    }, []);


 if(state.bookings.length){
    reservas = state.bookings.map(booking => <Booking booking={booking}/>)
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
                <img
                    src={props.loggedInUser.avatar}
                    alt="Avatar"
                    className="avatar"/>

                <h2>Hola {props.loggedInUser.username}!</h2>
                <p>email: {props.loggedInUser.email}</p>
                <p>Número de teléfono: {props.loggedInUser.telNumber}</p>
            </div>
            <div className="body-container">
                <div className="row">
                    <div className="col">
                        <Link
                            to="/property/create-property"
                            className="btn-kokomo btn-kokomo-success float-right">
                            Crear una nueva reserva
                        </Link>
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
