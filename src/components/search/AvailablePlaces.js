import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AvailablePlaces = (props) => {
  const initialState = {
    availableResults: props.results,
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

  if (state.availableResults[0].property) {
    console.log(state.availableResults[0].property.name);
    console.log(state.availableResults);
    available = state.availableResults.map((result, index) => (
      <div className="one-property" key={index}>
        <a href="/property/result.property.propertyId">
          <div className="property-card">
            <span className="fa-stack fa-2x float-right heart-home">
              <i className="fas fa-circle fa-stack-2x orange-80"></i>
              <i className="fas fa-heart fa-stack-1x fa-inverse"></i>
            </span>
            <div>
              <img src={result.property.mainImage} className="blur-image" alt={result.property.name} />
            </div>
          </div>
        </a>
        <div className="search-pc">
          <h3>{result.property.name}</h3>
          <p className="mdi mdi-map-marker-radius">
            {result.property.location.name}
          </p>
          <div className="row mt-3 ml-2 mb-4">
            {result.timeboxes.map((timebox) => (
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="scheduleId" value={timebox._id} />

                <input type="hidden" name="day" value={timebox.day} />

                <input type="hidden" name="guests" value={result.guests} />
                <input
                  type="submit"
                  className="kokomo-hours"
                  value={timebox.startTime}
                />
              </form>
            ))}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="body-container">
      <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
      <div className="properties-group-2"></div>
      {available}
    </div>
  );
};

export default AvailablePlaces;
