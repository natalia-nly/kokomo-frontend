import React, {useState, useEffect} from "react";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AvailableTimes from "./availableTimes";
import DetailedMap from "../search/DetailedMap";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import dateFormat from "dateformat";
import SearchIcon from "@material-ui/icons/Search";

const PropertyDetails = (props) => {
    const initialState = {
        property: {
            name: "",
            location: {
                name: "",
                lat: 41.393542,
                lng: 2.203153
            },
            rating: {
                counter: [4]
            },
            openingHours: [
                {
                    openingDays: {
                        openingDay: "",
                        closingDay: ""
                    },
                    openingTimes: [
                        {
                            openingTime: 0,
                            closingTime: 0
                        }
                    ],
                    weekDays: []
                }
            ],
            bookings: [],
            comments: [
                {
                    username: "",
                    comment: ""
                }
            ]
        },
        availableResults: [],
        comment: "",
        favourites: [],
        ratingComment: 4
    };

    const [state,
        setState] = useState(initialState);

    let actualRating = {
        size: 12,
        count: 5,
        color: "#174e67",
        activeColor: "#174e67",
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: (<i
            className="fa fa-star-half-alt"
            style={{
            color: "#174e67"
        }}/>),
        filledIcon: <i className="fa fa-star"/>,
        edit: false,
        value: state.actualRating
    };

    let ownRating = {
        size: 12,
        count: 5,
        color: "#ffba69",
        activeColor: "#ffba69",
        value: state.ratingComment,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: <i className="fa fa-star-half-alt"/>,
        filledIcon: <i className="fa fa-star"/>,
        onChange: (newValue) => {
            setState({
                ...state,
                ratingComment: newValue
            });
        }
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            bookingDate: state.bookingDate,
            numberGuests: state.numberGuests
        };
        axios
            .post(process.env.REACT_APP_API_URL + "/search/property/" + props.match.params.propertyId, body, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                setState({
                    ...state,
                    availableResults: response.data
                });
            });
    };

    const handleFavourite = () => {
        axios
            .get(process.env.REACT_APP_API_URL + "/property/love/" + state.property._id, {withCredentials: true})
            .then((response) => {
                console.log("Favorito añadido", response.data);
                const newFavs = [...state.favourites];
                newFavs.push(state.property._id);

                setState({
                    ...state,
                    favourites: newFavs
                });
            });
    };

    const handleComment = (e) => {
        e.preventDefault();
        let body = {
            username: props.getTheUser.username,
            comment: state.comment,
            avatar: props.getTheUser.avatar,
            rating: state.ratingComment
        };
        axios
            .post(process.env.REACT_APP_API_URL + "/property/add-comment/" + props.match.params.propertyId, body, {withCredentials: true})
            .then((response) => {
                console.log("Comentario añadido", response.data);
                setState({
                    ...state,
                    property: response.data,
                    comment: ""
                });
            });
    };

    useEffect(() => {
        console.log(props);
        axios
            .get(process.env.REACT_APP_API_URL + "/property/" + props.match.params.propertyId, {withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET", response);
                let counter = response.data.rating.counter;
                let reduceFunc = (a, b) => a + b;

                let rateNumber = parseFloat((counter.reduce(reduceFunc, 0) / counter.length).toFixed(2));

                console.log("rate number", rateNumber);

                setState({
                    ...state,
                    property: response.data,
                    actualRating: rateNumber
                });
            });
    }, []);

    var heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
    if (state.favourites && state.favourites.includes(state.property._id)) {
        heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
    }

    console.log(state.availableResults);

    var availableTimes = <></>;

  if (state.availableResults.length) {
    availableTimes = (
      <AvailableTimes
        guests={state.numberGuests}
        results={state.availableResults}
      / >);
}

var allComments = state.property.comments
.map((comment, index) => (
    <div className="comment-kokomo pb-4 pt-4" key={index}>
        <h5>
            <img
                src={comment.avatar}
                alt="Avatar"
                style={{
                width: "30px",
                borderRadius: "100px",
                marginRight: "10px"
            }}/> {comment.username}
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
    <div className="form-group" style={{
        width: "70%"
    }}>
        <label htmlFor="comment" className="label active">
            Deja tu comentario
        </label>
        <input
            type="text"
            name="comment"
            value={state.comment}
            onChange={handleChange}/>
    </div>
    <div style={{
        width: "30%"
    }}>
        <input
            type="submit"
            value="Enviar"
            className="btn-kokomo-flex"
            style={{
            padding: "19px"
        }}/>
    </div>
</form> </>
    );

    showProperty = (
      <>
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
      </>
    );
  }

let ratingProperty = <></>;
  if (state.actualRating) {
    ratingProperty = (
      <div className="d-flex">
        <ReactStars {...actualRating} /> 
        <p className="text-review">
    {state.property.rating.counter.length}
    reseñas
</p> 
</div>
    );
  }

  const formatOpening = dateFormat(
    state.property.openingHours[0].openingDays.openingDay,
    "dd/mm / yyyy "
);
const formatClosing = dateFormat(state.property.openingHours[0].openingDays.closingDay, "dd/mm/yyyy");
let weekDaysFormat = [];
state.property.openingHours[0].weekDays
.forEach((day) => {
switch (day) {
    case 1:
        weekDaysFormat.push("Lunes");
        break;
    case 2:
        weekDaysFormat.push("Martes");
        break;
    case 3:
        weekDaysFormat.push("Miércoles");
        break;
    case 4:
        weekDaysFormat.push("Jueves");
        break;
    case 5:
        weekDaysFormat.push("Viernes");
        break;
    case 6:
        weekDaysFormat.push("Sábado");
        break;
    case 7:
        weekDaysFormat.push("Domingo");
}
});

let daysInTable = weekDaysFormat
.map((day, index) => (
    <tr>
    <td>
        <p>{day}</p>
    </td>
    <td>
        <p>
            {state.property.openingHours[0].openingTimes[0].openingTime}:00 -{" "} {state.property.openingHours[0].openingTimes[0].closingTime}:00
        </p>
    </td>
</tr>
));

  return (
    <>
      <Link to="/">
        <div>
          <span className="fa-stack fa-2x kokomo-back-button">
            <i className="fas fa-circle fa-stack-2x circle-back"></i>
            <i class="fas fa-arrow-left fa-stack-1x fa-inverse arrow-back"></i>
          </span>
        </div>
      </Link>
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
              <a onClick={handleFavourite}>
                <span className="fa-stack fa-2x mr-4">
                  <i className="fas fa-circle fa-stack-2x orange"></i>
                  <i className={heartKokomo}></i>
                </span>
              </a>
            </div>
            <div>
              <h2 className="title-search">{state.property.name}</h2>
              {ratingProperty}
            </div>
          </div>
          <Tabs
            defaultActiveKey="nav-description"
            id="nav-tab"
            className="nav nav-tabs nav-fill tab-details"
          >
            <Tab
              eventKey="nav-description"
              title="Descripción"
              className="nav-item nav-link"
            >
              <div className="row">
                 <div className="col-md-6">
                <h3 className="subtitle-search mb-4">
                    {state.property.description}
                </h3>

                <p>Duración de la reserva: {state.property.bookingDuration}</p>
                <p>Plazas disponibles: {state.property.availablePlaces}</p>
                <p>
                            <i className="fas fa-map-marker-alt"></i>
                            {" "}Dirección: {state.property.location.name}
                        </p>
                </div>
                 <div className="col-md-6">
                        <DetailedMap
                            lat={state.property.location.lat}
                            lng={state.property.location.long}
                            property={state.property}/>
                    </div>
               
                </div>
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
              <div className="row">
                <div className="col-md-6">
                  
                </div>
                <div className="col-md-6">
                  <p>
                    Día de apertura:
                    <span id="openingDay1"> {formatOpening}</span>
                  </p>

                  <p>
                    Día de cierre:
                    <span id="closingDay1"> {formatClosing}</span>
                  </p>

                  <table class="table">
                    <tbody>{daysInTable}</tbody>
                  </table>
                </div>
              </div>
            </Tab>
          </Tabs>
          {showProperty}
        </div>
      </div>
      {availableTimes}
    </>
  );
};

export default PropertyDetails;
