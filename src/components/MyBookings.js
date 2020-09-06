import React from "react";
import axios from "axios";

const MyBookings = (props) => {
 
  let allBookings = "";

  allBookings = props.loggedInUser.bookings.map((booking, index) => (
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
      </div>
      <div className="column-xl">
        <p>
          <span className="fa-stack fa-lg">
            <i className="fas fa-square fa-stack-2x orange-20"></i>
            <i className="fas fa-users fa-stack-1x orange"></i>
          </span>
          {booking.guests} personas
        </p>
        <p>
          <span className="fa-stack fa-lg">
            <i className="fas fa-square fa-stack-2x orange-20"></i>
            <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
          </span>
          {booking.property.name}
        </p>
      </div>
      <div className="column-xs">
        <div className="dropdown dropleft float-right">
          <button
            className="btn-kokomo btn-kokomo-grey"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              padding: "10px 19px",
              "border-radius": "100%",
            }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/booking/details/{{_id}}">
              <i className="mdi mdi-eye"></i> Ver detalles
            </a>
            <a
              className="dropdown-item"
              href="whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-app.herokuapp.com/booking/details/{{_id}}"
            >
              <i className="mdi mdi-share-variant"></i> Compartir reserva
            </a>
            <div className="dropdown-divider"></div>
            <a className="danger ml-4" href="/booking/delete/{{_id}}">
              <i className="far fa-trash-alt"></i> Cancelar reserva
            </a>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="body-container">
        <h3 className="section-title mt-4 mdi mdi-calendar"> Tus reservas</h3>
        <div className="row mb-5">
          <div className="col-md-6"></div>
        </div>

        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-next-bookings-tab"
                data-toggle="tab"
                href="#nav-next-bookings"
                role="tab"
                aria-controls="nav-next-bookings"
                aria-selected="true"
              >
                Próximas reservas
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              div
              className="tab-pane fade show active"
              id="nav-next-bookings"
              role="tabpanel"
              aria-labelledby="nav-next-bookings-tab"
            >
              <div className="group-booking">{allBookings}</div>

              <p>Todavía no tienes reservas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
