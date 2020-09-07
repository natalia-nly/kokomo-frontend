import React, { useState, useEffect } from "react";
import axios from "axios";
import Booking from "./Booking";
const initialState = {
  bookings: [],
};
let reservas = <p>Todavía no tienes reservas</p>;
const MyBookings = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking/my-bookings", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response.data.bookings);
        setState({
          ...state,
          bookings: response.data.bookings,
        });
      });
  }, []);

  if (state.bookings.length) {
    console.log(state.bookings);
    reservas = state.bookings.map((booking) => <Booking booking={booking} />);
  }

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
              <div className="group-booking">{reservas}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
