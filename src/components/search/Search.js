import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import axios from "axios";
import AvailablePlaces from "./AvailablePlaces";
import Map from "./Map";

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);
const initialState = {
  bookingDate: date,
  numberGuests: 0,
  availableResults: [],
};

const Search = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      bookingDate: state.bookingDate,
      numberGuests: state.numberGuests,
    };
    axios
      .post("http://localhost:5000/api/search/getAvailability", body, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          availableResults: response.data,
        });
      });
  };

  let availablePlaces = <></>;

  if (state.availableResults.length) {
    availablePlaces = <AvailablePlaces results={state.availableResults} />;
  }

  return (
    <div>
      <div className="container mt-4 mapa">
        <h1>Búsqueda de locales</h1>
        <h2>Todos los locales</h2>
        <Map />
      </div>
      <div className="body-container">
        <h3 className="section-title mt-4 mdi mdi-magnify">
          Busca el mejor sitio
        </h3>
        <div className="row d-flex align-items-center justify-content-center">
          <form className="form-row mb-5" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="bookingDate" className="label active">
                    ¿Qué día quieres venir?
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    onChange={handleChange}
                    value={state.bookingDate}
                    data-date-format="DD MMMM YYYY"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="numberGuests" className="label active">
                    ¿Cuántos seréis?
                  </label>
                  <input
                    type="number"
                    name="numberGuests"
                    min="1"
                    onChange={handleChange}
                    value={state.numberGuests}
                    className="kokomo-input"
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Ver disponibildad"
              className="kokomo-btn-form p-3"
            />
          </form>
        </div>
        <div>{availablePlaces}</div>
      </div>
    </div>
  );
};

export default Search;
