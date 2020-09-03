import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarouselProperties = (props) => {
  const initialState = {
    properties: [],
    favourites: []
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/", { withCredentials: true })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({ ...state, favourites: response.data[1] , properties:response.data[0]});
      });
  }, 1);

  let allProperties = "";

  allProperties = state.properties.map((property, index) => {
    console.log("DESDE EL map: ", property);
    let heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
    if (
      state.favourites.length &&
      state.favourites.includes(property._id)
    ) {
      heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
    }
    return (
      <Link to={"/property/" + property._id}>
        <Link to={"/property/" + property._id}>
          <div className="property-card" key={index}>
            <span className="fa-stack fa-2x float-right heart-home">
              <i className="fas fa-circle fa-stack-2x orange-80"></i>
              <i className={heartKokomo}></i>
            </span>
            <img
              src={property.mainImage}
              style={{
                "z-index": 1,
              }}
            />
            <img src={property.mainImage} className="blur-image" />

            <h3>{property.name}</h3>
            <p className="mdi mdi-map-marker-radius">
              {" "}
              {property.location.name}
            </p>
          </div>
        </Link>
      </Link>
    );
  });

  return <div className="properties-group">{allProperties}</div>;
};

export default CarouselProperties;
