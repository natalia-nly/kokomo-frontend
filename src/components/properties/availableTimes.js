import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AvailableTimes = (props) => {
  const initialState = {
    availableResults: props.results,
    guests: props.guests,
    bookingFinished: false,
    bookingId: 0,
    day: "",
    hour: "",
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
        process.env.REACT_APP_API_URL +
          "/booking/create-booking/" +
          params.scheduleId,
        body,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          bookingFinished: true,
          bookingId: response.data._id,
          day: response.data.day,
          hour: response.data.time,
        });
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

  let whatsAppLink = `whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-react.herokuapp.com/booking/details/${state.bookingId}`;

  let bookingDetails = (
    <>
      <img src="/images/3.png" className="emoji-img" />

      <h2 className="subtitle-landing text-center mb-3">
        ¡Reserva creada con éxito!
      </h2>
      <p>
        <i className="far fa-calendar-alt"></i> Día: {state.day}
      </p>
      <p>
        <i className="far fa-clock"></i> Hora: {state.hour}
      </p>
      <p>
        <i className="fas fa-users"></i> Número de personas: {state.guests}
      </p>

      <a
        href={whatsAppLink}
        className="btn-kokomo btn-kokomo-grey mt-4 mr-2 p-3"
      >
        Compartir reserva por WhatsApp
      </a>
      <Link to="/" className="btn-kokomo btn-kokomo-grey mt-4 ml-2 p-3">
        Volver a inicio
      </Link>
    </>
  );

  let finalResult = (
    <>
      <img src="/images/calendar.png" className="emoji-img" />
      <h2 className="subtitle-landing text-center mb-3">Horas disponibles</h2>
      <div className="row">{available}</div>
    </>
  );

  if (state.bookingFinished) {
    finalResult = bookingDetails;
  }

  return (
    <>
      <div className="text-center d-flex align-items-center justify-content-center kokomo-popup">
        <div className="row align-middle justify-content-center w-100">
          <div className="col-md-4 align-self-center fondo-kokomo">
            {finalResult}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableTimes;
