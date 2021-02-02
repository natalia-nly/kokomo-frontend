import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import StepperKokomo from "../components/properties/StepperKokomo";
import SearchService from "../services/search/search-service";
import PropertyService from "../services/property/property-service";

const propertyService = new PropertyService();
const search = new SearchService();

const initialState = {
  name: "",
  description: "",
  categories: [],
  mainImage: null,
  location: {
    name: "",
    lat: 0,
    long: 0,
  },
  openingHours: [
    {
      openingDays: {
        openingDay: null,
        closingDay: null,
      },
      weekDays: [],
      openingTimes: [
        {
          openingTime: 0,
          closingTime: 0,
        },
      ],
    },
  ],
  bookingDuration: 0,
  availablePlaces: 0,
};

function CreateProperty() {
  let history = useHistory();
  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: state.name,
      description: state.description,
      categories: state.categories,
      location: {
        name: state.location.name,
        lat: state.location.lat,
        long: state.location.long,
      },
      openingHours: [...state.openingHours],
      bookingDuration: state.bookingDuration,
      availablePlaces: state.availablePlaces,
      mainImage: state.mainImage,
    };


    propertyService
      .createProperty(body)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("mainImage", e.target.files[0]);
    propertyService.uploadPicture(uploadData).then((response) => {
      setState({ ...state, mainImage: response.path });
    });
  };

  const handleOpeningDay = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingDays.openingDay = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleClosingDay = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingDays.closingDay = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleOpeningTime = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingTimes[0].openingTime = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleClosingTime = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingTimes[0].closingTime = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleWeekdays = (e) => {
    let weekDays = [...state.openingHours];
    if (weekDays[0].weekDays.includes(parseInt(e.target.value))) {
      const index = weekDays[0].weekDays.indexOf(parseInt(e.target.value));
      weekDays[0].weekDays.splice(index, 1);
    } else {
      weekDays[0].weekDays.push(parseInt(e.target.value));
    }
    setState({
      ...state,
      openingHours: weekDays,
    });
  };

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    search.searchLocation(state.search).then((response) => {
      setState({
        ...state,
        search: response.candidates[0].name,
        location: {
          lat: response.candidates[0].geometry.location.lat,
          long: response.candidates[0].geometry.location.lng,
          name: response.candidates[0].formatted_address,
        },
      });
    });
  };

  const stepsTitles = [
    <p>Datos principales</p>,
    <p>Horarios</p>,
    <p>El local</p>,
  ];

  const step1 = (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="name" className="label active">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="label active">
              Imagen
            </label>
            <input type="file" name="imageUrl" onChange={handleFile} />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="description" className="label active">
              Descripción
            </label>
            <input
              type="textarea"
              name="description"
              value={state.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories" className="label active">
              Categoría
            </label>
            <input
              list="categories"
              type="categories"
              id="input-categories"
              name="categories"
              onChange={handleChange}
            ></input>
            <datalist id="categories">
              <option value="Chillout" />
              <option value="Surfer" />
              <option value="Restaurante" />
              <option value="Discoteca" />
              <option value="Bar" />
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );

  const step2 = (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="openingDay" className="label active">
              Día de apertura
            </label>
            <input
              type="date"
              name="openingDay"
              value={state.openingHours[0].openingDays.openingDay}
              onChange={handleOpeningDay}
            />
          </div>
          <div className="form-group">
            <label htmlFor="closingDay" className="label active">
              Día de cierre
            </label>
            <input
              type="date"
              name="closingDay"
              value={state.openingHours[0].openingDays.closingDay}
              onChange={handleClosingDay}
            />
          </div>

          <h6>Días de la semana</h6>
          <div className="form-group">
            <div className="row mt-3">
              <div className="col-6">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="monday"
                    value={1}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="monday">
                    Lunes
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="tuesday"
                    value={2}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="tuesday">
                    Martes
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="wednesday"
                    value={3}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="wednesday">
                    Miércoles
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="thursday"
                    value={4}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="thursday">
                    Jueves
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="friday"
                    value={5}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="friday">
                    Viernes
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="saturday"
                    value={6}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="saturday">
                    Sábado
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="sunday"
                    value={0}
                    onChange={handleWeekdays}
                  />
                  <label className="custom-control-label" htmlFor="sunday">
                    Domingo
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="openingHours" className="label active">
              Hora de apertura
            </label>
            <input
              type="number"
              name="openingHours"
              value={state.openingHours[0].openingTimes[0].openingTime}
              onChange={handleOpeningTime}
            />
          </div>
          <div className="form-group">
            <label htmlFor="closingHours" className="label active">
              Hora de cierre
            </label>
            <input
              type="number"
              name="closingHours"
              value={state.openingHours[0].openingTimes[0].closingTime}
              onChange={handleClosingTime}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const step3 = (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="bookingDuration" className="label active">
              Duración de la reserva (en minutos)
            </label>
            <input
              type="number"
              name="bookingDuration"
              value={state.bookingDuration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="availablePlaces" className="label active">
              Plazas
            </label>
            <input
              type="number"
              name="availablePlaces"
              value={state.availablePlaces}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleGoogleSearch} className="d-flex">
            <div className="form-group" style={{ width: "80%" }}>
              <label htmlFor="search" className="label active">
                Dirección
              </label>
              <input
                type="text"
                name="search"
                value={state.search}
                onChange={handleChange}
              />
            </div>
            <div style={{ width: "20%" }}>
              <input
                type="submit"
                value="Buscar"
                className="btn-kokomo-flex"
                style={{ padding: "19px" }}
              />
            </div>
          </form>
          <p>Candidato: {state.search}</p>
          <p>Dirección:{state.location.name}</p>
          <p>Latitud:{state.location.lat}</p>
          <p>Longitud:{state.location.long}</p>
        </div>
      </div>
    </div>
  );

  const allSteps = [step1, step2, step3];

  return (
    <div className="container mt-4">
      <Link to="/">
        <div>
          <span className="fa-stack fa-2x kokomo-back-button">
            <i className="fas fa-circle fa-stack-2x circle-back"></i>
            <i className="fas fa-arrow-left fa-stack-1x fa-inverse arrow-back"></i>
          </span>
        </div>
      </Link>
      <div className="hero">
        <h2 className="hero-title text-center">Crea tu local</h2>
      </div>
      <StepperKokomo
        allSteps={allSteps}
        stepsTitles={stepsTitles}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateProperty;
