import React, { useState, useEffect } from "react";
import CarouselProperties from "./CarouselProperties";
import axios from "axios";
import PropertyService from "../../services/property/property-service";

let service = new PropertyService();
const initialState = {
  properties: [],
};

const PropertyCategory = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        service.categoryProperties(props.match.params.name).then((response) => {
          console.log("CONSOLE LOG DESDE AXIOS GET", response[0]);
          setState((state) => ({
            ...state,
            properties: response[0],
          }));
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [props.match.params.name]);

  return (
    <div>
      <div className="body-container">
        <h3 className="section-title mt-4 text-center">
          {props.match.params.name}
        </h3>
        <CarouselProperties filter={props.match.params.name} />
      </div>
    </div>
  );
};

export default PropertyCategory;
