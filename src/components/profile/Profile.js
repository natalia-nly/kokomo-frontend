import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Booking from "./Booking"
import OwnerLocal from "./OwnerLocal"
import OwnerAgenda from "./OwnerAgenda"
import axios from "axios";

var reservas = <p>Todavía no tienes reservas</p>
var reservasProperties = <p>Todavía no tienes reservas</p>
var owner=<></>
const initialState = {
    bookings: [],
    properties: []
}

const Profile = (props) => {

  
    console.log("estamos en profile");
    console.log(props.loggedInUser)

  const [state, setState] = useState(initialState);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/booking/my-bookings", {withCredentials: true})
            .then((response) => {
                console.log('data', response.data)
                console.log("CONSOLE LOG DESDE AXIOS GET mis reservas", response.data.bookings);
                setState({
                    ...state,
                    bookings: response.data.bookings
                });
            });
    }, []);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/booking/my-properties-bookings", {withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET bookings en mis props:", response.data.ownProperties);
                setState({
                    ...state,
                    properties: response.data.ownProperties
                });
            });

    }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const deleteBooking = (event) => {
    event.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/booking/delete/" +
          event.target.bookingId.value,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        refreshPage();
      });
  };

  const deleteProperty = (propertyId) => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/property/delete/" +
          propertyId,
        
        { withCredentials: true }
      )
      .then((response) => {
        refreshPage();
      });
  }

  if (state.bookings.length) {
    console.log(state.bookings);
    reservas = state.bookings.map((booking, index) => (
      <Booking key={index} booking={booking} delete={deleteBooking} />
    ));
  }

  if (state.properties.length) {
    console.log(state.properties);
    reservasProperties = state.properties.map((property, index) => (
      <div key={index}>
        <Link to={"/property/" + property._id}>
          <h3>{property.name}</h3>
          <p className="mdi mdi-map-marker-radius"> {property.name}</p>
        </Link>
        <Link
          to={"/property/edit/" + property._id}
          className="btn-kokomo btn-kokomo-grey float-right"
        >
          Editar local
        </Link>
        <button
          onClick={() => deleteProperty(property._id)}
          className="btn-kokomo btn-kokomo-danger float-right"
        >
          Eliminar local
        </button>
        {property.bookings.map((booking, index) => (
          <div className="group-booking" key={index}>
            <div className="row">
              <div className="column-xs">
                <div>
                  <p className="mb-4">
                    <span className="booking-ref">{booking.bookingRef}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="far fa-calendar-check fa-stack-1x orange"></i>
                    </span>
                    {booking.day}
                  </p>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="far fa-clock fa-stack-1x orange"></i>
                    </span>
                    {booking.time}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="fas fa-users fa-stack-1x orange"></i>
                    </span>
                    {booking.guests}
                    persona(s)
                  </p>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="fas fa-user fa-stack-1x orange"></i>
                    </span>
                    {booking.customer.username}
                  </p>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="fas fa-at fa-stack-1x orange"></i>
                    </span>
                    {booking.customer.email}
                  </p>
                  <p>
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-square fa-stack-2x orange-20"></i>
                      <i className="fas fa-phone fa-stack-1x orange"></i>
                    </span>
                    {booking.customer.telNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
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
          paddingBottom: "30px",
        }}
      >
        <img src={props.loggedInUser.avatar} alt="Avatar" className="avatar" />

        <h2>Hola {props.loggedInUser.username}!</h2>
        <p>email: {props.loggedInUser.email}</p>
        <p>Número de teléfono: {props.loggedInUser.telNumber}</p>
      </div>
      <div className="body-container">
        <div className="row">
          <div className="col">
            <Link
              to="/search"
              className="btn-kokomo btn-kokomo-success float-right"
            >
              Crear una nueva reserva
            </Link>
            <div className="col">
              <Link
                to="/property/create-property"
                className="btn-kokomo btn-kokomo-success float-right"
              >
                Crear un nuevo local
              </Link>
            </div>
          </div>
        </div>
        <h4 className="section-title">Tus Reservas</h4>
        {reservas}
      </div>
      <div className="body-container">
        <div className="row">
          <div className="col">
            <Link
              to="/property/create-property"
              className="btn-kokomo btn-kokomo-success float-right"
            >
              Crear un nuevo local
            </Link>
          </div>
        </div>
        <h4 className="section-title">Tus Locales</h4>
        {reservasProperties}
      </div>
    </div>
  );
};

export default Profile;
