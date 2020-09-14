import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import PropertyService from "../../services/property/property-service";

let service = new PropertyService();
const initialState = {
  properties: [],
  favourites: [],
};
const CarouselProperties = (props) => {
  const [state, setState] = useState(initialState);

  let allProperties;

  useEffect(() => {
    if (props.filter === "All") {
      // axios
      //   .get(process.env.REACT_APP_API_URL + "/", { withCredentials: true })
      service.allProperties().then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({
          ...state,
          favourites: response[1],
          properties: response[0],
        });

        allProperties = <p>¡Todavía no hay nada!</p>;
      });
    } else if (props.filter === "Favourites") {
      // axios
      //   .get(process.env.REACT_APP_API_URL + "/", { withCredentials: true })
      service.allProperties().then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        let favouritesResult = response[1];
        let propertiesResult = response[0];

        let onlyFavs = [];
        propertiesResult.map((property) => {
          if (favouritesResult.includes(property._id)) {
            onlyFavs.push(property);
          }
        });

        setState({
          ...state,
          favourites: favouritesResult,
          properties: onlyFavs,
        });

        allProperties = <p>¡Todavía no hay nada!</p>;
      });
    } else if (props.filter === "Categories") {
      // axios
      //   .get(
      //     process.env.REACT_APP_API_URL +
      //       "/property/category/" +
      //       props.match.params.name,
      //     { withCredentials: true }
      //   )
      service.categoryProperties(props.match.params.name)
        .then((response) => {
          console.log("CONSOLE LOG DESDE AXIOS GET", response);

          setState({
            ...state,
            favourites: response[1],
            properties: response[0],
          });

          allProperties = (
            <>
              <img
                src={"/images/" + props.match.params.name + ".png"}
                alt={props.match.params.name}
              />
            </>
          );
        });
    } else {
      // axios
      //   .get(
      //     process.env.REACT_APP_API_URL + "/search/category/" + props.filter,
      //     { withCredentials: true }
      //   )
      service.categoryProperties(props.filter)
        .then((response) => {
          console.log("CONSOLE LOG DESDE AXIOS GET", response);

          setState({
            ...state,
            favourites: response[1],
            properties: response[0],
          });

          allProperties = (
            <>
              <img
                src={"/images/" + props.filter + ".png"}
                alt={props.filter}
              />
            </>
          );
        });
    }
  }, []);

  const handleFavourite = (propertyId) => {
    console.log("ID desde favs: ", propertyId);
    // axios
    //   .get(process.env.REACT_APP_API_URL + "/property/love/" + propertyId, {
    //     withCredentials: true,
    //   })
    service.propertyLove(propertyId)
      .then((response) => {
        console.log("Favorito añadido", response);
        const newFavs = [...state.favourites];
        newFavs.push(propertyId);

        setState({
          ...state,
          favourites: newFavs,
        });
      });
  };

  if (state.properties.length) {
    let allPropertiesMap = state.properties.map((property, index) => {
      let heartKokomo = "far fa-heart fa-stack-1x fa-inverse";
      if (state.favourites && state.favourites.includes(property._id)) {
        heartKokomo = "fas fa-heart fa-stack-1x fa-inverse";
      }

      let ratingProperty = <></>;

      if (property.rating) {
        let counter = property.rating.counter;
        let reduceFunc = (a, b) => a + b;

        let rateNumber = parseFloat(
          (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
        );

        let actualRating = {
          size: 12,
          count: 5,
          color: "#ffba69",
          activeColor: "#ffba69",
          a11y: true,
          isHalf: true,
          emptyIcon: <i className="far fa-star" />,
          halfIcon: (
            <i className="fa fa-star-half-alt" style={{ color: "#ffba69" }} />
          ),
          filledIcon: <i className="fa fa-star" />,
          edit: false,
          value: rateNumber,
        };

        ratingProperty = (
          <div>
            <ReactStars {...actualRating} />
          </div>
        );
      }
      return (
        <div className="property-card" key={index}>
          <a onClick={() => handleFavourite(property._id)}>
            <span className="fa-stack fa-2x float-right heart-home">
              <i className="fas fa-circle fa-stack-2x orange-80"></i>
              <i className={heartKokomo}></i>
            </span>
          </a>
          <Link to={"/property/" + property._id}>
            <img
              src={property.mainImage}
              style={{
                zIndex: 1,
              }}
              alt={property.name}
            />
            <img
              src={property.mainImage}
              className="blur-image"
              alt={property.name}
            />
          </Link>
          <Link to={"/property/" + property._id}>
            <div className="flex-md-row justify-content-between align-items-baseline">
              <h3>{property.name}</h3>
              {ratingProperty}
            </div>

            <p className="mdi mdi-map-marker-radius">
              {" "}
              {property.location.name}
            </p>
          </Link>
        </div>
      );
    });

    allProperties = <div className="properties-group">{allPropertiesMap}</div>;
  }

  return <>{allProperties}</>;
};

export default CarouselProperties;
