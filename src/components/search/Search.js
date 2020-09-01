import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react'
import axios from "axios";

const Search = (props) => {




  const initialState = {
      search: "",
      oneResult: "",
      miles: 100,
      lat: 41.2651462,
      lng: 1.993513,
      allResults: []
    };
  
    const [state, setState] = useState(initialState)
  

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5000/api/search/maps?search=" + state.search)
      .then((response) => {
          console.log(response)
        setState({
          ...state,
          oneResult: response.data.candidates[0],
          lat: response.data.candidates[0].geometry.location.lat,
          lng: response.data.candidates[0].geometry.location.lng,
        });
      });
  };

  const center = {
    lat: state.lat,
    lng: state.lng
}

const zoom = 15
const key = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(key)
const getMapOptions = (maps) => {
    return {
        disableDefaultUI: false,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }] }],
        }
}
const renderMarkers = (map, maps) => {
    const position = {
        lat: state.lat,
        lng: state.lng
    }
    let marker = new maps.Marker({
        position: position,
        map,
        title: state.direccion})
}


    return (
   
      <div className="container mt-4 mapa">
        <h1>Search</h1>
        <GoogleMapReact
                    bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_API_KEY,language: 'sp'}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={getMapOptions}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}/>
        <form className="form-row mb-5" onSubmit={handleSubmit}>
          <div className="col-auto">
            <input
              type="text"
              name="search"
              onChange={handleChange}
              value={state.search}
              className="form-control"
            />
          </div>

          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
        <hr />

        <h2>Places near "{state.search}"</h2>
        {state.results}
      </div>
    );
  
}

export default Search;
