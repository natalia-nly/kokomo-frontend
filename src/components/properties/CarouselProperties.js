import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarouselProperties = (props) => {
  const initialState = {
    properties: [],
    favourites: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if(props.filter === "All"){
      axios
      .get(process.env.REACT_APP_API_URL + "/", { withCredentials: true })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({
          ...state,
          favourites: response.data[1],
          properties: response.data[0],
        });
      });
    } else if (props.filter === "Favourites") {
      axios
      .get(process.env.REACT_APP_API_URL + "/", { withCredentials: true })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);
        
        setState({
          ...state,
          favourites: response.data[1],
          properties: response.data[0],
        });
      });
    } else if (props.filter === "Categories") {
      axios
      .get(process.env.REACT_APP_API_URL + "/search/category/" + props.match.params.name, { withCredentials: true })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({
          ...state,
          favourites: response.data[1],
          properties: response.data[0],
        });
      })
    } else {
      axios
      .get(process.env.REACT_APP_API_URL + "/search/category/" + props.filter, { withCredentials: true })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({
          ...state,
          favourites: response.data[1],
          properties: response.data[0],
        });
      })
    }
  }, [1])


  const handleFavourite = (propertyId) => {
    console.log("ID desde favs: ", propertyId)
    axios
      .get(process.env.REACT_APP_API_URL + "/property/love/" + propertyId, { withCredentials: true })
      .then((response) => {
        console.log("Favorito añadido", response);
        const newFavs = [...state.favourites]
        newFavs.push(propertyId)

        setState({
          ...state,
          favourites: newFavs
        });
      });
  }

  let allProperties = "";

  allProperties = state.properties.map((property, index) => {
    let heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
    if (state.favourites.length && state.favourites.includes(property._id)) {
      heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
    }
    return (
      
          <div className="property-card" key={index}>
          <a onClick={() => handleFavourite(property._id)}>
            <span className="fa-stack fa-2x float-right heart-home">
              <i className="fas fa-circle fa-stack-2x orange-80"></i>
              <i className={heartKokomo}></i>
            </span>
            </a>
            <a href={"/property/" + property._id}>
            <img
              src={property.mainImage}
              style={{
                "zIndex": 1,
              }}
            />
            <img src={property.mainImage} className="blur-image" />
            </a>
            <a href={"/property/" + property._id}>
            <h3>{property.name}</h3>
            <p className="mdi mdi-map-marker-radius">
              {" "}
              {property.location.name}
            </p>
            </a>
          </div>
        
      
    );
  });

  return <div className="properties-group">{allProperties}</div>;
};

export default CarouselProperties;
