import React, { useState } from "react";
import axios from "axios";
import AvailablePlaces from "./AvailablePlaces";
import GeneralMap from "./GeneralMap";
import SearchIcon from "@material-ui/icons/Search";
import Categories from "../properties/Categories";

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
      .post(process.env.REACT_APP_API_URL + "/search/getAvailability", body, {
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
    <div className="body-container">
      <div>
        <h3 className="section-title mt-4 mdi mdi-magnify">
          Busca el mejor sitio
        </h3>
        <GeneralMap />
       
      </div>
      <div>
        <div className="row d-flex align-items-center justify-content-center">
          <form className="form-row flotante-kokomo" onSubmit={handleSubmit}>
            <div className="row w-100">
              <div className="col-40">
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
              <div className="col-40">
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
              <div className="col-20">
                <button type="submit" className="kokomo-btn-form">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>{availablePlaces}</div>
      </div>
    </div>
  );
};

export default Search;
