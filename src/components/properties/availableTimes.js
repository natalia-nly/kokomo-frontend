import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AvailableTimes = (props) => {
  const initialState = {
    availableResults: props.results,
    guests: props.guests,
    bookingFinished: false,
  };

  const [state, setState] = useState(initialState);

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
        process.env.REACT_APP_API_URL + "/booking/create-booking/" + params.scheduleId,
        body,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setState({ ...state, bookingFinished: true });
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

  let bookingDetails = (
    <div class="text-center d-flex align-items-center justify-content-center kokomo-popup">
      <div>
        <img src="/images/3.png" class="emoji-img" />

        <h2 class="subtitle-landing text-center mb-3">
          ¡Reserva creada con éxito!
        </h2>
        <p>
          <i class="far fa-calendar-alt"></i> Día:{""}
        </p>
        <p>
          <i class="far fa-clock"></i> Hora:{" "}
        </p>
        <p>
          <i class="fas fa-users"></i> Número de personas: {state.guests}
        </p>
        <p>
          <i class="fas fa-users"></i> A nombre de:{" "}
        </p>

        <a
          href="whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-app.herokuapp.com/booking/details/{{booking._id}}"
          class="btn-kokomo btn-kokomo-grey mt-4 mr-2 p-3"
        >
          Compartir reserva por WhatsApp
        </a>
        <Link to="/" class="btn-kokomo btn-kokomo-grey mt-4 ml-2 p-3">
          Volver a inicio
        </Link>
      </div>
    </div>
  );

  let finalResult = (
    <div className="row">
      <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
      <div className="row">{available}</div>
    </div>
  );

  if (state.bookingFinished) {
    finalResult = bookingDetails;
  }

  return <>{finalResult}</>;
};

export default AvailableTimes;
