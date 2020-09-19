import React, { useState } from "react";
import AvailablePlaces from "./AvailablePlaces";
import GeneralMap from "./GeneralMap";
import SearchIcon from "@material-ui/icons/Search";
import SearchService from "../../services/search/search-service";
import { SectionTitleStyle } from "../styled-components/titles";

const service = new SearchService();
let curr = new Date();
curr.setDate(curr.getDate());
let date = curr.toISOString().substr(0, 10);
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

    service.getAvailability(body).then((response) => {
      setState({
        ...state,
        availableResults: response,
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
        <SectionTitleStyle>
          <i className="mdi mdi-magnify"></i> Busca el mejor sitio
        </SectionTitleStyle>

        <GeneralMap />
      </div>
      <div>
        <div className="row d-flex align-items-center justify-content-center mt-5">
          <form
            className="form-row flotante-kokomo-search"
            onSubmit={handleSubmit}
          >
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
