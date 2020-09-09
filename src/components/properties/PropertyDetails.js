import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AvailableTimes from "./availableTimes";
import DetailedMap from "../search/DetailedMap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const PropertyDetails = (props) => {
  const initialState = {
    property: {
      name: "",
      location: {
        name: "",
        lat: 41.393542,
        lng: 2.203153,
      },
      rating: {
        counter: [4],
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
      comments: [
        {
          username: "",
          comment: "",
        },
      ],
    },
    availableResults: [],
    comment: "",
    favourites: [],
    ratingComment: 4,
  };

  const [state, setState] = useState(initialState);

  let actualRating = {
    size: 12,
    count: 5,
    color: "#ffba69",
    activeColor: "#ffba69",
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    edit: false,
    value: state.actualRating,
  };

  let ownRating = {
    size: 12,
    count: 5,
    color: "#ffba69",
    activeColor: "#ffba69",
    value: state.ratingComment,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setState({ ...state, ratingComment: newValue });
    },
  };

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
      .post(
        process.env.REACT_APP_API_URL +
          "/search/property/" +
          props.match.params.propertyId,
        body,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          availableResults: response.data,
        });
      });
  };

  const handleFavourite = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/property/love/" + state.property._id,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Favorito añadido", response.data);
        const newFavs = [...state.favourites];
        newFavs.push(state.property._id);

        setState({
          ...state,
          favourites: newFavs,
        });
      });
  };

  const handleComment = (e) => {
    e.preventDefault();
    let body = {
      username: props.getTheUser.username,
      comment: state.comment,
      avatar: props.getTheUser.avatar,
      rating: state.ratingComment,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/property/add-comment/" +
          props.match.params.propertyId,
        body,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Comentario añadido", response.data);
        setState({ ...state, property: response.data, comment: "" });
      });
  };

  useEffect(() => {
    console.log(props);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/property/" +
          props.match.params.propertyId,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);
        let counter = response.data.rating.counter;
        let reduceFunc = (a, b) => a + b;

        let rateNumber = parseFloat(
          (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
        );

        console.log("rate number", rateNumber);

        setState({
          ...state,
          property: response.data,
          actualRating: rateNumber,
        });
      });
  }, []);

  var heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
  if (state.favourites && state.favourites.includes(state.property._id)) {
    console.log("yes?");
    heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
  }

  console.log(state.availableResults);

  var availableTimes = <></>;

  if (state.availableResults.length) {
    availableTimes = (
      <AvailableTimes
        guests={state.numberGuests}
        results={state.availableResults}
      />
    );
  }

  var allComments = state.property.comments.map((comment, index) => (
    <div className="comment-kokomo pb-4 pt-4" key={index}>
      <h5>
        <img
          src={comment.avatar}
          alt="Avatar"
          style={{ width: "30px", borderRadius: "100px", marginRight: "10px" }}
        />
        {comment.username}
      </h5>
      <p>{comment.comment}</p>
    </div>
  ));

  var showProperty = (
    <div className="mt-4 border-top">
      <p>Necesitas una cuenta para poder hacer reservas.</p>
      <Link to="/signup" className="btn btn-success mt-3">
        Regístrate ahora
      </Link>
    </div>
  );

  var addComment = <></>;

  if (props.getTheUser) {
    addComment = (
      <>
        <ReactStars {...ownRating} />
        <form onSubmit={handleComment} className="d-flex mt-2">
          <div className="form-group" style={{ width: "70%" }}>
            <label htmlFor="comment" className="label active">
              Deja tu comentario
            </label>
            <input
              type="text"
              name="comment"
              value={state.comment}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "30%" }}>
            <input
              type="submit"
              value="Enviar"
              className="btn-kokomo-flex"
              style={{ padding: "19px" }}
            />
          </div>
        </form>
      </>
    );

    showProperty = (
      <>
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

        {availableTimes}
      </>
    );
  }

  let ratingProperty = <></>;
  if (state.actualRating) {
    ratingProperty = <ReactStars {...actualRating} />;
  }
  return (
    <div
      className="home-bg image-background"
      style={{
        backgroundImage: `url(${state.property.mainImage})`,
      }}
    >
      <div className="container-left"></div>

      <div className="white-card">
        <div className="title-heart">
          <a onClick={handleFavourite}>
            <div>
              <span className="fa-stack fa-2x mr-4">
                <i className="fas fa-circle fa-stack-2x orange"></i>
                <i className={heartKokomo}></i>
              </span>
            </div>
          </a>
          <div>
            <h2 className="title-search">{state.property.name}</h2>
            {ratingProperty}
          </div>
        </div>
        <Tabs
          defaultActiveKey="nav-description"
          id="nav-tab"
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
            <div className="row">
              <div className="col-md-6">{addComment}</div>
              <div className="col-md-6">{allComments}</div>
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
              {state.property.openingHours[0].openingTimes[0].openingTime}
            </p>
            <p>
              Hora de cierre:{" "}
              {state.property.openingHours[0].openingTimes[0].closingTime}
            </p>
            <DetailedMap
              lat={state.property.location.lat}
              lng={state.property.location.long}
              property={state.property}
            />
          </Tab>
        </Tabs>
        {showProperty}
      </div>
    </div>
  );
};

export default PropertyDetails;
