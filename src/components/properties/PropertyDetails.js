import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AvailableTimes from "./availableTimes"
import Map from "../search/Map"


const PropertyDetails = (props) => {
  const initialState = {
    property: {
      name: "",
      location: {
        name: "Test",
      },
      openingHours: [
        {
          openingDays: {
            openingDay: "",
            closingDay: "",
          },
          openingTimes: [
            {
              openingTime: 0,
              closingTime: 0,
            },
          ],
          weekDays: [],
        },
      ],
      bookings: [],
    },
    availableResults: []
  };

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
      .post("http://localhost:5000/api/search/property/" +props.match.params.propertyId, body, {
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

  useEffect(() => {
    console.log(props);
    axios
      .get(
        "http://localhost:5000/api/property/" + props.match.params.propertyId,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);
        setState({
          ...state,
          property: response.data,
        });
      });
  }, [2]);

  let property = state.property;
  console.log(state.availableResults);

  let availableTimes = <></>;

  if (state.availableResults.length) {
    availableTimes = <AvailableTimes guests={state.numberGuests} results={state.availableResults} />;
  }

  let showProperty = (
    <div
      className="home-bg image-background"
      style={{
        backgroundImage: `url(${state.property.mainImage})`,
      }}
    >
      <div className="container-left"></div>

      <div className="white-card">
        <div className="title-heart">
          <div>
            <span className="fa-stack fa-2x mr-4">
              <i className="fas fa-circle fa-stack-2x orange"></i>
              <i className="far fa-heart fa-stack-1x fa-inverse"></i>
            </span>
          </div>
          <div>
            <h2 className="title-search">{state.property.name}</h2>
          </div>
        </div>
        <Tabs
          defaultActiveKey="nav-description"
          id="uncontrolled-tab-example"
          className="nav nav-tabs nav-fill"
        >
          <Tab
            eventKey="nav-description"
            title="Descripción"
            className="nav-item nav-link"
          >
            <h3 className="subtitle-search mb-4">
              {state.property.description}
            </h3>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {state.property.location.name}
            </p>
            <p>Duración de la reserva: {state.property.bookingDuration}</p>
            <p>Plazas disponibles: {state.property.availablePlaces}</p>
 
          </Tab>
          <Tab
            eventKey="nav-comments"
            title="Comentarios"
            className="nav-item nav-link"
          >
            <div class="row">
              <div class="col-md-6">
                <form
                  action="/property/add-comment/{{property._id}}"
                  method="POST"
                >
                  <input
                    type="hidden"
                    name="userId"
                    value="{{../user.username}}"
                  />
                  <div class="form-group">
                    <label for="comment" class="label active">
                      Deja tu comentario
                    </label>
                    <textarea name="comment" cols="30" rows="3"></textarea>
                  </div>

                  <input
                    type="submit"
                    value="Enviar"
                    class="btn-kokomo btn-kokomo-grey btn-block"
                  />
                </form>
              </div>
              <div class="col-md-6">
                <div class="border-bottom pb-4 pt-4">
                  <h5>
                    <i class="fas fa-user-circle"></i> username{" "}
                  </h5>
                  <p>
                    <i class="far fa-comment-dots"></i> comment{" "}
                  </p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="nav-openings"
            title="Horarios"
            className="nav-item nav-link"
          >
            <h3 className="subtitle-search mb-4">Días de apertura</h3>

            <p>
              Día de apertura:
              <span id="openingDay1">
                {state.property.openingHours[0].openingDays.openingDay}
              </span>
            </p>

            <p>
              Día de cierre:
              <span id="closingDay1">
                {state.property.openingHours[0].openingDays.closingDay}
              </span>
            </p>

            <p>Días de la semana: {state.property.openingHours[0].weekDays}</p>

            <p>
              Hora de apertura:{" "}
              {state.property.openingHours[0].openingTimes.openingTime}
            </p>
            <p>
              Hora de cierre:{" "}
              {state.property.openingHours[0].openingTimes.closingTime}
            </p>
            <Map lat={state.lat}  lng={state.lng} property={state.property}/>
          </Tab>
        </Tabs>
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
        <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
        
        {availableTimes}
        
      </div>
    </div>
  );

  let noUser = (
    <div
    className="home-bg image-background"
    style={{
      backgroundImage: `url(${state.property.mainImage})`,
    }}
  >
    <div className="container-left"></div>
    <div className="white-card">
      <div className="title-heart">
        <div>
          <span className="fa-stack fa-2x mr-4">
            <i className="fas fa-circle fa-stack-2x orange"></i>
            <i className="far fa-heart fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <div>
          <h2 className="title-search">{state.property.name}</h2>
        </div>
      </div>
      <Tabs
        defaultActiveKey="nav-description"
        id="uncontrolled-tab-example"
        className="nav nav-tabs nav-fill"
      >
        <Tab
          eventKey="nav-description"
          title="Descripción"
          className="nav-item nav-link"
        >
          <h3 className="subtitle-search mb-4">
            {state.property.description}
          </h3>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            {state.property.location.name}
          </p>
          <p>Duración de la reserva: {state.property.bookingDuration}</p>
          <p>Plazas disponibles: {state.property.availablePlaces}</p>
        </Tab>
        <Tab
          eventKey="nav-comments"
          title="Comentarios"
          className="nav-item nav-link"
        >
          <div class="row">
            <div class="col-md-6">
              <form
                action="/property/add-comment/{{property._id}}"
                method="POST"
              >
                <input
                  type="hidden"
                  name="userId"
                  value="{{../user.username}}"
                />
                <div class="form-group">
                  <label for="comment" class="label active">
                    Deja tu comentario
                  </label>
                  <textarea name="comment" cols="30" rows="3"></textarea>
                </div>

                <input
                  type="submit"
                  value="Enviar"
                  class="btn-kokomo btn-kokomo-grey btn-block"
                />
              </form>
            </div>
            <div class="col-md-6">
              <div class="border-bottom pb-4 pt-4">
                <h5>
                  <i class="fas fa-user-circle"></i> username{" "}
                </h5>
                <p>
                  <i class="far fa-comment-dots"></i> comment{" "}
                </p>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="nav-openings"
          title="Horarios"
          className="nav-item nav-link"
        >
          <h3 className="subtitle-search mb-4">Días de apertura</h3>

          <p>
            Día de apertura:
            <span id="openingDay1">
              {state.property.openingHours[0].openingDays.openingDay}
            </span>
          </p>

          <p>
            Día de cierre:
            <span id="closingDay1">
              {state.property.openingHours[0].openingDays.closingDay}
            </span>
          </p>

          <p>Días de la semana: {state.property.openingHours[0].weekDays}</p>

          <p>
            Hora de apertura:{" "}
            {state.property.openingHours[0].openingTimes.openingTime}
          </p>
          <p>
            Hora de cierre:{" "}
            {state.property.openingHours[0].openingTimes.closingTime}
          </p>
          <Map lat={state.lat}  lng={state.lng} property={state.property}/>
        </Tab>
      </Tabs>

      <div className="mt-4 border-top">
      <p>Necesitas una cuenta para poder hacer reservas.</p>
      <a href="/signup" className="btn btn-success mt-3">
        Regístrate ahora
      </a>
    </div>
    </div>
  </div>
  );

  if (!props.getTheUser) {
    showProperty = noUser;
  }

  return <div>{showProperty}</div>;
};

export default PropertyDetails;
