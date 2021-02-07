import React from "react";
import GoogleMapReact from "google-map-react";

const DetailedMap = (props) => {
  let curr = new Date();
  curr.setDate(curr.getDate());

  let center = {
    lat: 41.2862717,
    lng: 1.9799514
  };

  const zoom = 11;

  center = {
    lat: props.lat,
    lng: props.lng,
  };

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
    <a href="/property/${
      place._id
    }" class="btn-kokomo btn-kokomo-danger" style="font-size: 16px;">
    ${place.name}
    </a>

    <div style="font-size: 14px;">
        <span style="color: grey;">Nota:
        ${ActualRating(place.rating)}
        </span>
      <div style="font-size: 14px; color: grey;">Categoría:
        ${place.categories[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
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
    markers.push(
      new maps.Marker({
        position: {
          lat: places.location.lat,
          lng: places.location.long,
        },
        map,
      })
    );
    infowindows.push(
      new maps.InfoWindow({ content: getInfoWindowString(places) })
    );

    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  return (
    <div className="container mapa">
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
          handleApiLoaded(map, maps, props.property)
        }
      />
    </div>
  );
};

export default DetailedMap;
