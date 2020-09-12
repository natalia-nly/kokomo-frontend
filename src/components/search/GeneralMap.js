import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

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
    axios.get(process.env.REACT_APP_API_URL + "/").then((response) => {
      console.log("CONSOLE LOG DESDE AXIOS GET", response);
      setState({
        ...state,
        allResults: response.data[0],
      });
    });
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

  const getInfoWindowString = (place) => {
    let today = new Date();
    let openingDate = new Date(place.openingHours[0].openingDays.openingDay);
    let closingDate = new Date(place.openingHours[0].openingDays.closingDay);

    return `
    <div>
    <a href="/property/${
      place._id
    }" class="btn-kokomo btn-kokomo-danger" style="font-size: 16px;">
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

  const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];
    console.log(places.length);
    console.log(places);

    places.forEach((place) => {
      console.log(place.location);
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

  console.log(state.allResults);
  return <div>{mapa}</div>;
};

export default GeneralMap;
