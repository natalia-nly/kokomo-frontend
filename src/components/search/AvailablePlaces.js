import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AvailablePlaces = (props) => {
  const initialState = {
    availableResults: props.results,
  };

  const [state, setState] = useState(initialState);

  let available = "No results";
  console.log(state.availableResults);

  if (state.availableResults[0].property) {
      console.log(state.availableResults[0].property.name)
      console.log(state.availableResults);
    available = state.availableResults.map((result, index) => (
      <div className="one-property" key={index}>
        <a href="/property/result.property.propertyId">
          <div className="property-card">
            <span className="fa-stack fa-2x float-right heart-home">
              <i className="fas fa-circle fa-stack-2x orange-80"></i>
              <i className="fas fa-heart fa-stack-1x fa-inverse"></i>
            </span>
            <div>
              <img src="{result.property.mainImage}" />
              <img src="{result.mainImage}" className="blur-image" />
            </div>
          </div>
        </a>
        <div className="search-pc">
          <h3>{result.property.name}</h3>
          <p className="mdi mdi-map-marker-radius"></p>
          <div className="row mt-3 ml-2 mb-4"></div>
        </div>
      </div>
    ));

    // available = state.availableResults.map(result =>{
    //   console.log(result.property)
    //   return(<h1>{result.property.name}</h1>)} 
    // )
  }

  return (
    <div className="body-container">
      <h3 className="mt-4 mb-4 section-title">Resultados de tu búsqueda</h3>
      <div className="properties-group-2"></div>
      {available}
    </div>
  );
};

export default AvailablePlaces;
