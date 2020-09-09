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
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        axios
          .get(process.env.REACT_APP_API_URL + "/booking/my-bookings", {
            withCredentials: true,
          })
          .then((response) => {
            console.log("CONSOLE LOG DESDE AXIOS GET", response.data.bookings);
            setState({
              ...state,
              bookings: response.data.bookings,
            });
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
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
    console.log(state.bookings);
    reservas = state.bookings.map((booking, index) => <Booking key ={index} booking={booking} delete={deleteBooking} />);
  }

  return (
    <div>
      <div className="body-container">
        <h3 className="section-title mt-4 mdi mdi-calendar">Tus reservas</h3>
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
