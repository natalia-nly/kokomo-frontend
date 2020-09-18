import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import PropertyService from "../../services/property/property-service";

let service = new PropertyService();

const GeneralMap = () => {
  let curr = new Date();
  curr.setDate(curr.getDate());
  let date = curr.toISOString().substr(0, 10);
  const initialState = {
    allResults: [],
    bookingDate: date,
    numberGuests: 0,
  };
  let center = {
    lat: 41.35,
    lng: 2.1,
  };

  const zoom = 11;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
    service.allProperties().then((response) => {
      setState(state => ({
        ...state,
        allResults: response[0],
      }));
    }); 
  } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled");
      } else {
        throw error;
      }
    }}
    loadData();
    return () => {
      source.cancel();
    };
  }, []);

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

  const ActualRating = (rating) => {
    let counter = rating.counter;
    if (rating.counter.length) {
      let reduceFunc = (a, b) => a + b;
      return parseFloat(
        (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
      );
      
    } else {
      return 'Sin evaluaciones';
    }
  };

  const getInfoWindowString = (place) => {
    let today = new Date();
    let openingDate = new Date(place.openingHours[0].openingDays.openingDay);
    let closingDate = new Date(place.openingHours[0].openingDays.closingDay);

    return `
    <div>
    <a href="/#/property/${
      place._id
    }" class="btn-kokomo btn-kokomo-danger" style="font-size: 16px;">
    ${place.name}
    </a>

    <div style="font-size: 14px;">
        <span style="color: grey;">Nota:
        ${ActualRating(place.rating)}
        </span>
      </div>
      <div style="font-size: 14px; color: grey;">Categoría:
        ${place.categories[0]}
      </div>
      <div style="font-size: 14px; color: green;">
        ${
          openingDate.getTime() <= today.getTime() &&
          today.getTime() <= closingDate.getTime()
            ? "Abierto"
            : "Cerrado"
        }
      </div>
    </div>`;
  };

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

  let mapa = <></>;
  if (state.allResults.length) {
    mapa = (
      <div className="container mt-4 mapa">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            language: "sp",
          }}
          center={center}
          defaultZoom={zoom}
          options={getMapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            handleApiLoaded(map, maps, state.allResults)
          }
        />
      </div>
    );
  }

  return <div>{mapa}</div>;
};

export default GeneralMap;
