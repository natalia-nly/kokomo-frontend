import React, { useState, useEffect } from "react";
import DetailedMap from "../search/DetailedMap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const initialState = {
  bookingId: "",
};

const Booking = (props) => {
  const [state, setState] = useState(initialState);

  console.log("estamos en booking");
  console.log(props);
  useEffect(() => {
    setState({
      ...state,
      bookingId: props.booking._id,
      bookingRef: props.booking.bookingRef,
      day: props.booking.day,
      time: props.booking.time,
      guests: props.booking.guests,
      lat: props.booking.property.location.lat,
      lng: props.booking.property.location.long,
      property: props.booking.property,
      name: props.booking.property.name,
      propertyId: props.booking.property._id,
    });
  }, []);

  return (
    <>
      <div className="div-booking">
        <div className="column-xs">
          <p className="mb-4">
            <span className="booking-ref">{state.bookingRef}</span>
          </p>
        </div>
        <div className="column-xl">
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="far fa-calendar-check fa-stack-1x orange"></i>
            </span>
            {state.day}
          </p>
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="far fa-clock fa-stack-1x orange"></i>
            </span>
            {state.time}
          </p>
        </div>
        <div className="column-xl">
          <p>
            <Link to={"/property/" + state.propertyId}>
              <span className="fa-stack fa-lg">
                <i className="fas fa-square fa-stack-2x orange-20"></i>
                <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
              </span>
              {state.name}
            </Link>
          </p>
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="fas fa-users fa-stack-1x orange"></i>
            </span>
            {state.guests}
            persona(s)
          </p>
        </div>
        <div className="column-xs">
          <DropdownButton
            id="dropdown-kokomo-button"
            title={<i className="fas fa-ellipsis-v"></i>}
            className="float-right"
          >
            <Dropdown.Item variant="success" className="dropdown-item">
              <Link to={"/booking/details/" + state.bookingId}>
                <i class="mdi mdi-eye"></i> Ver detalles
              </Link>
            </Dropdown.Item>

            <Dropdown.Item
              variant="success"
              className="dropdown-item"
              href={
                "whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-react.herokuapp.com/booking/details/" +
                state.bookingId
              }
            >
              <i className="mdi mdi-share-variant"></i> Compartir reserva
            </Dropdown.Item>
            <Dropdown.Divider />
            <form onSubmit={props.delete} className="dropdown-item danger">
              <input type="hidden" name="bookingId" value={state.bookingId} />
              <button className="link-danger">
                <i className="far fa-trash-alt"></i> Cancelar reserva
              </button>
            </form>
          </DropdownButton>
        </div>
      </div>
    </>
  );
};

export default Booking;
