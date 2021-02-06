import React, { useState, useEffect } from "react";
import PropertyService from "../../services/property/property-service";
import ActualRatingCarousel from "./ActualRatingCarousel";
import { CarouselPropStyles } from "../../styles/PropertiesStyles";
import PropertyCard from "./PropertyCard";

let service = new PropertyService();
const initialState = {
  properties: [],
  favourites: [],
};
const CarouselProperties = (props) => {
  const [state, setState] = useState(initialState);

  let allProperties = "carousel";

  useEffect(() => {
    if (props.filter === "All") {
      service.allProperties().then((response) => {
        setState((state) => ({
          ...state,
          favourites: response[1],
          properties: response[0],
        }));
      });
    } else if (props.filter === "Favourites") {
      service.allProperties().then((response) => {
        let favouritesResult = response[1];
        let propertiesResult = response[0];

        let onlyFavs = [];
        propertiesResult.map((property) => {
          if (favouritesResult.includes(property._id)) {
            onlyFavs.push(property);
          }
          return onlyFavs;
        });

        setState((state) => ({
          ...state,
          favourites: favouritesResult,
          properties: onlyFavs,
        }));
      });
    } else {
      service.categoryProperties(props.filter).then((response) => {
        setState((state) => ({
          ...state,
          favourites: response[1],
          properties: response[0],
        }));
      });
    }
  }, [props]);

  const handleFavourite = (propertyId) => {
    service.propertyLove(propertyId).then((response) => {
      const newFavs = [...state.favourites];
      newFavs.push(propertyId);

      setState({
        ...state,
        favourites: newFavs,
      });
    });
  };

  
  if (state.properties?.length) {
    let allPropertiesMap = state.properties.map((property) => {
      let heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
      if (state.favourites && state.favourites.includes(property._id)) {
        heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
      }

      let ratingProperty = <></>;

      if (property.rating) {
        let counter = property.rating.counter;
        let rateNumber = 0;
        if (counter.length) {
          let reduceFunc = (a, b) => a + b;
          rateNumber = parseFloat(
            (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
          );
        }

        ratingProperty = (
          <ActualRatingCarousel
            rate={rateNumber}
            numberReviews={counter.length}
          />
        );
      }
      return (
        <PropertyCard
          key={property._id}
          property={property}
          handleFavourite={handleFavourite}
          ratingProperty={ratingProperty}
          heartKokomo={heartKokomo}
        />
      );
    });

    allProperties = <CarouselPropStyles>{allPropertiesMap}</CarouselPropStyles>;
  } else {
    if (props.filter === "Favourites") {
      allProperties = (
        <div className="text-center">
          <img
            src="/images/broken-heart.png"
            className="black-white"
            alt="Sin favoritos"
          />
          <p>Todavía no tienes favoritos</p>
        </div>
      );
    } else {
      allProperties = (
        <div className="mb-5">
          <img
            src={"/images/" + props.filter + ".png"}
            className="black-white"
            alt={props.filter}
          />
          <p>Todavía no hay locales en la categoria {props.filter}</p>
        </div>
      );
    }
  }

  
  return <>{allProperties}</>;
};

export default CarouselProperties;
