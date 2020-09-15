import React, { useState, useEffect } from "react";
import CarouselProperties from "./CarouselProperties";
import PropertyService from "../../services/property/property-service";

let service = new PropertyService();

const PropertyCategory = (props) => {
  const initialState = {
      title: props.match.params.name,
    properties: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log(props);
    service.categoryProperties(state.title)
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response[0]);
        setState({
          ...state,
          properties: response[0]
        });
      });
  }, []);

  return (
    <div>
      <div class="body-container">
        <h3 class="section-title mt-4 text-center">
          {state.title}
        </h3>

        <CarouselProperties filter={state.title}/>

      </div>
    </div>
  );
};

export default PropertyCategory;
