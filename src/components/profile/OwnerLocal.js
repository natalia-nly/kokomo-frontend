import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const OwnerLocal = (props) => {
  return (
    <div>
      <Link to={"/property/" + props.property._id}>
        <h2 className="title-search">{props.property.name}</h2>
        <p className="mdi mdi-map-marker-radius mb-4">
          {" "}
          {props.property.location.name}
        </p>
      </Link>
      {props.property.bookings.map((booking, index) => (
        <>
          <div className="div-booking">
            <div className="column-xs">
              <p className="mb-4">
                <span className="booking-ref">{booking.bookingRef}</span>
              </p>
            </div>
            <div className="column-xl">
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
              <p>
                <span className="fa-stack fa-lg">
                  <i className="fas fa-square fa-stack-2x orange-20"></i>
                  <i className="fas fa-users fa-stack-1x orange"></i>
                </span>
                {booking.guests}
                persona(s)
              </p>
            </div>
            <div className="column-xl">
              <p>
                <span className="fa-stack fa-lg">
                  <i className="fas fa-square fa-stack-2x orange-20"></i>
                  <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
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
            <div className="column-xs">
              <DropdownButton
                id="dropdown-kokomo-button"
                title={<i className="fas fa-ellipsis-v"></i>}
                className="float-right"
              >
                <Dropdown.Item
                  variant="success"
                  className="dropdown-item"
                  href={
                    "whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-react.herokuapp.com/booking/details/" +
                    booking._id
                  }
                >
                  <i className="mdi mdi-share-variant"></i> Compartir reserva
                </Dropdown.Item>
                <Dropdown.Divider />
                <form onSubmit={props.delete} className="dropdown-item danger">
                  <input type="hidden" name="bookingId" value={booking._id} />
                  <button className="link-danger">
                    <i className="far fa-trash-alt"></i> Cancelar reserva
                  </button>
                </form>
              </DropdownButton>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default OwnerLocal;
