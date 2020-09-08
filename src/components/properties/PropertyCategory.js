import React, { useState, useEffect } from "react";
import CarouselProperties from "./CarouselProperties";
import axios from "axios";

const PropertyCategory = (props) => {
  const initialState = {
      title: props.match.params.name,
    properties: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log(props);
    axios
      .get(
        process.env.REACT_APP_API_URL + "/search/category/" + state.title
      )
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response.data[0]);
        setState({
          ...state,
          properties: response.data[0]
        });
      });
  }, [1]);

  return (
    <div>
      <div class="body-container">
        <h3 class="section-title mt-4">
          <i class="fas fa-heart fa-sm"></i>
          {state.title}
        </h3>

        <CarouselProperties filter={state.title}/>

        <p>Todavía no hay ningún local en esta categoría</p>
      </div>
    </div>
  );
};

export default PropertyCategory;
