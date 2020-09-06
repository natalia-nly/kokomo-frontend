import React, {useState, useEffect} from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr
    .toISOString()
    .substr(0, 10);
const initialState = {
    allResults: [],
    bookingDate: date,
    numberGuests: 0
};
const center = {
    lat: 41.35,
    lng: 2.1
};

const zoom = 11;

const Map = () => {
    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/")
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET", response);
                setState({
                    ...state,
                    allResults: response.data[0]
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
                            visibility: "on"
                        }
                    ]
                }
            ]
        };
    };

    const getInfoWindowString = (place) => {
        var today = new Date();
        var openingDate = new Date(place.openingHours[0].openingDays.openingDay);
        var closingDate = new Date(place.openingHours[0].openingDays.closingDay);

        return `
    <div>
    <a href="http://localhost:3000/property/${
        place
            ._id}" class="btn-kokomo btn-kokomo-danger" style="font-size: 16px;">
    ${place
            .name}
    </a>

    <div style="font-size: 14px;">
        <span style="color: grey;">Rating:
        ${place
            .rating}
        </span>
        <span style="color: orange;">${String
            .fromCharCode(9733)
            .repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String
            .fromCharCode(9733)
            .repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">Category:
        ${place
            .categories[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${ "$"
            .repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${
        openingDate.getTime() <= today.getTime() && today.getTime() <= closingDate.getTime()
            ? "Open"
            : "Closed"}
      </div>
    </div>`;
    };

    const handleApiLoaded = (map, maps, places) => {
        const markers = [];
        const infowindows = [];

        places.forEach((place) => {
            markers.push(new maps.Marker({
                position: {
                    lat: place.location.lat,
                    lng: place.location.long
                },
                map
            }));

            infowindows.push(new maps.InfoWindow({content: getInfoWindowString(place)}));
        });

        markers.forEach((marker, i) => {
            marker.addListener("click", () => {
                infowindows[i].open(map, marker);
            });
        });
    };

    return (
        <div className="container mt-4 mapa">
            <GoogleMapReact
                bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_API_KEY,
                language: "sp"
            }}
                defaultCenter={center}
                defaultZoom={zoom}
                options={getMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps, state.allResults)}/>
        </div>
    );
};

export default Map;
