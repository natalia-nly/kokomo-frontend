import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = (props) => {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);
  const initialState = {
    search: "",
    oneResult: "",
    miles: 100,
    lat: 41.2651462,
    lng: 1.993513,
    allResults: [],
    selected: "",
    direccion: "Chalito",
    oneResult: "",
    bookingDate: date,
    numberGuests: 0,
  };

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5000/api/search/maps?search=" + state.search)
      .then((response) => {
        console.log(response);
        setState({
          ...state,
          oneResult: response.data.candidates[0].name,
          lat: response.data.candidates[0].geometry.location.lat,
          lng: response.data.candidates[0].geometry.location.lng,
        });
      });
  };

  const center = {
    lat: state.lat,
    lng: state.lng,
  };

  const zoom = 11;
  const key = process.env.REACT_APP_GOOGLE_API_KEY;
  console.log(key);
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
      ],
    };
  };

  const getInfoWindowString = (place) => {
    var today = new Date();
    var openingDate = new Date(place.openingHours[0].openingDays.openingDay);
    var closingDate = new Date(place.openingHours[0].openingDays.closingDay);

    return `
    <div>
    <a href="http://localhost:3000/property/${place._id}" class="btn-kokomo btn-kokomo-danger" style="font-size: 16px;">
    ${place.name}
    </a>

      <div style="font-size: 14px;">
        <span style="color: grey;">Rating:
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(
      9733
    ).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">Category:
        ${place.categories[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${
          openingDate.getTime() <= today.getTime() &&
          today.getTime() <= closingDate.getTime()
            ? "Open"
            : "Closed"
        }
      </div>
    </div>`;
  };

  // Refer to
  // https://github.com/google-map-react/google-map-react#use-google-maps-api
  const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach((place) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: place.location.lat,
            lng: place.location.long,
          },
          map,
        })
      );

      infowindows.push(
        new maps.InfoWindow({ content: getInfoWindowString(place) })
      );
    });

    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/").then((response) => {
      console.log("CONSOLE LOG DESDE AXIOS GET", response);
      setState({
        ...state,
        allResults: response.data[0],
      });
    });
  },[2]);

  return (
    <div>
      <div className="container mt-4 mapa">
        <h1>Búsqueda de locales</h1>
        <h2>Todos los locales</h2>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            language: "sp",
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            handleApiLoaded(map, maps, state.allResults)
          }
        />
      </div>
      <div className="body-container">
        <h3 className="section-title mt-4 mdi mdi-magnify">
          Busca el mejor sitio
        </h3>
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
      </div>
    </div>
  );
};

export default Search;
