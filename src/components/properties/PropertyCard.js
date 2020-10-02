import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  let property = props.property;

  return (
    <div className="property-card">
      <a onClick={() => props.handleFavourite(property._id)}>
        <span className="fa-stack fa-2x float-right heart-home">
          <i className="fas fa-circle fa-stack-2x orange-80"></i>
          <i className={props.heartKokomo}></i>
        </span>
      </a>
      <Link to={`/property/${property._id}`}>
        <img src={property.mainImage} alt={property.name} />
        <img
          src={property.mainImage}
          className="blur-image"
          alt={property.name}
        />
      </Link>
      <Link to={`/property/${property._id}`}>
        <div className="flex-md-row justify-content-between align-items-baseline">
          <h3>{property.name}</h3>
          {props.ratingProperty}
        </div>

        <p className="mdi mdi-map-marker-radius"> {property.location.name}</p>
      </Link>
    </div>
  );
};

export default PropertyCard;
