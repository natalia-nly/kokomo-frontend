import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AvailableTimes = (props) => {
  const initialState = {
    availableResults: props.results,
    guests: props.guests,
  };

  const [state, setState] = useState(initialState);

  let history = useHistory();

  let available = "No results";
  console.log(state.availableResults);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const params = {
      scheduleId: event.target.scheduleId.value,
    };
    console.log(params.scheduleId);
    const body = {
      day: event.target.day.value,
      //property: propertyInput.current.value,
      guests: event.target.guests.value,
    };
    axios
      .post(
        "http://localhost:5000/api/booking/create-booking/" + params.scheduleId,
        body,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        history.push("/profile");
      });
  };

  if (state.availableResults) {
    available = state.availableResults.map((timebox) => (
      <div className="col-auto mb-3">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="scheduleId" value={timebox._id} />

          <input type="hidden" name="day" value={timebox.day} />

          <input type="hidden" name="guests" value={state.guests} />
          <input
            type="submit"
            className="kokomo-hours"
            value={timebox.startTime}
          />
        </form>
      </div>
    ));
  }

  return (
    <div className="row">
      <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
      <div className="row">
      {available}
      </div>

    </div>
  );
};

export default AvailableTimes;
