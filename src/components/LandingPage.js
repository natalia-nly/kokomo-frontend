import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarouselProperties from "./properties/CarouselProperties";
import GoogleMapReact from "google-map-react";
import axios from "axios";

const LandingPage = () => {

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
  },[]);

  return (
    <div>
      <div className="hero-landing" style={{ padding: "50px 10px" }}>
        <div className="home-container">
          <h2 className="hero-title" style={{ color: "white" }}>
            Este verano
            <br />
            no te quedes sin planes
          </h2>
          <h2 className="hero-subtitle" style={{ color: "#d0dde2" }}>
            Reserva en los mejores
            <br />
            locales de tu zona
          </h2>
          <h2 className="hero-arrow-phone mdi mdi-arrow-down"></h2>
          <h2 className="hero-arrow-desktop mdi mdi-arrow-down"></h2>
        </div>
      </div>
      {/* googlemaps */}
      <div className="mapa">
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
      <div className="bg-landing">
        <div className="container">
          <h2 className="title-landing text-center">Reserva en un segundo</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/1.png" className="emoji-img" />
                <h2 className="subtitle-landing">
                  Encuentra los mejores locales
                </h2>
                <p>
                  Filtra los locales por día o por categoría para encontrar el
                  ideal
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/2.png" className="emoji-img" />
                <h2 className="subtitle-landing">Crea tu reserva</h2>
                <p>Reserva rápidamente desde Kokomo en tus locales favoritos</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/3.png" className="emoji-img" />
                <h2 className="subtitle-landing">Compártela con tus amigos</h2>
                <p>Comparte los detalles de la reserva con quien quieras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="category-group" style={{ margin: "auto" }}>
        <div className="one-category">
          <a href="/category/Surfer">
            <div className="img-container">
              <img src="/images/surf.png" alt="Surfer" />
            </div>
            <p>Surfer</p>
          </a>
        </div>
        <div className="one-category">
          <a href="/category/Chillout">
            <div className="img-container">
              <img src="/images/chillout.png" alt="Chillout" />
            </div>
            <p>Chillout</p>
          </a>
        </div>
        <div className="one-category">
          <a href="/category/Discoteca">
            <div className="img-container">
              <img src="/images/disco.png" alt="Disco" />
            </div>
            <p>Disco</p>
          </a>
        </div>
        <div className="one-category">
          <a href="/category/Bar">
            <div className="img-container">
              <img src="/images/bar.png" alt="Bar" />
            </div>
            <p>Bar</p>
          </a>
        </div>
        <div className="one-category">
          <a href="/category/Restaurante">
            <div className="img-container">
              <img src="/images/restaurant.png" alt="Bar" />
            </div>
            <p>Restaurant</p>
          </a>
        </div>
      </div>
      <div className="landing-container" style={{ "padding-bottom": "80px" }}>
        {/* <div className="">
        <h2 className="title-search-home">Nuestros chiringuitos</h2>
        <div className="properties-group">
            {{#each properties}}
            <a href="/property/{{_id}}">
                <div className="property-card">
                    <span className="fa-stack fa-2x float-right heart-home">
                        <i className="fas fa-circle fa-stack-2x orange-80"></i>
                        <i className="far fa-heart fa-stack-1x fa-inverse"></i>
                    </span>
                    <img src="{{mainImage}}" style="z-index: 1;">
                    <img src="{{mainImage}}" className="blur-image">


                    <h3>{{name}}</h3>
                    <p className="mdi mdi-map-marker-radius"> {{location.name}}</p>
                </div>
            </a>
            {{/each}}
        </div> */}
        <CarouselProperties />

        <div className="banner-orange">
          <div className="row">
            <div className="col-md-6">
              <h2 className="hero-title" style={{ color: "white" }}>
                ¿Tienes un local?
              </h2>
              <h2 className="hero-subtitle" style={{ color: "white" }}>
                Registra tus locales y consigue reservas de tus clientes
              </h2>
            </div>
            <div className="col-md-6">
              <a
                href="/signup-local"
                className="btn-kokomo btn-kokomo-white float-right p-2 mt-4"
              >
                Crea tu cuenta
              </a>
            </div>
          </div>
        </div>

        {/* <h2 className="title-search-home mt-4">Estilo chillout</h2>
        <div className="properties-group">
            {{#each properties}}
            {{#ifCond categories "includes" "Chillout"}}
            <a href="/property/{{_id}}">
                <div className="property-card">
                    <span className="fa-stack fa-2x float-right heart-home">
                        <i className="fas fa-circle fa-stack-2x orange-80"></i>
                        <i className="far fa-heart fa-stack-1x fa-inverse"></i>
                    </span>
                    <img src="{{mainImage}}" style="z-index: 1;">
                    <img src="{{mainImage}}" className="blur-image">


                    <h3>{{name}}</h3>
                    <p className="mdi mdi-map-marker-radius"> {{location.name}}</p>
                </div>
            </a>
            {{/ifCond}}
            {{/each}}
        </div> */}

        {/* <h2 className="title-search-home mt-4">Los mejores restaurantes</h2>
        <div className="properties-group">
            {{#each properties}}
            {{#ifCond categories "includes" "Restaurante"}}
            <a href="/property/{{_id}}">
                <div className="property-card">
                    <span className="fa-stack fa-2x float-right heart-home">
                        <i className="fas fa-circle fa-stack-2x orange-80"></i>
                        <i className="far fa-heart fa-stack-1x fa-inverse"></i>
                    </span>
                    <img src="{{mainImage}}" style="z-index: 1;">
                    <img src="{{mainImage}}" className="blur-image">


                    <h3>{{name}}</h3>
                    <p className="mdi mdi-map-marker-radius"> {{location.name}}</p>
                </div>
            </a>
            {{/ifCond}}
            {{/each}}
        </div> 
        </div>*/}
      </div>
      <div className="footer">
        <p>
          Made in Barcelona |{" "}
          <a href="https://github.com/natalia-nly" target="_blank">
            Natalia
          </a>{" "}
          &{" "}
          <a href="https://github.com/CSS1982" target="_blank">
            Claudi
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
