import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import StepperKokomo from "../components/properties/StepperKokomo";
import { Link } from "react-router-dom";
import SearchService from "../services/search/search-service";
import PropertyService from "../services/property/property-service";

const propertyService = new PropertyService();
const search = new SearchService();

function EditProperty(props) {
  const initialState = {
    property: {
      name: "",
      description: "",
      categories: [],
      mainImage: null,
      location: {
        name: "",
        lat: 0,
        long: 0,
      },
    },
  };

  let history = useHistory();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    propertyService
      .propertyDetails(props.match.params.propertyId)
      .then((response) => {
        setState(state => ({
          ...state,
          property: response,
        }));
      });
  }, [props.match.params.propertyId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      _id: state.property._id,
      name: state.property.name,
      description: state.property.description,
      categories: state.property.categories,
      location: {
        name: state.property.location.name,
        lat: state.property.location.lat,
        long: state.property.location.long,
      },
      mainImage: state.property.mainImage,
    };

    propertyService
      .editProperty(state.property._id, body)
      .then((response) => {
        history.push(`/property/${state.property._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setState({
      ...state,
      property: {
        ...state.property,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeDirection = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("mainImage", e.target.files[0]);

    propertyService.uploadPicture(uploadData).then((response) => {
      setState({
        ...state,
        property: { ...state.property, mainImage: response.path },
      });
    });
  };

  const handleGoogleSearch = (e) => {
    e.preventDefault();

    search.searchLocation(state.search).then((response) => {
      // volver a renderizar el mapa con CENTER = lat, lng y un PIN =  lat, lng
      setState({
        ...state,
        search: response.candidates[0].name,
        property: {
          ...state.property,
          location: {
            lat: response.candidates[0].geometry.location.lat,
            long: response.candidates[0].geometry.location.lng,
            name: response.candidates[0].formatted_address,
          },
        },
      });
    });
  };

  const stepsTitles = [<p>Datos principales</p>, <p>El local</p>];

  const step1 = (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="name" className="label active">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={state.property.name}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div style={{ width: "20%" }}>
              <Image src={state.property.mainImage} rounded fluid />
            </div>
            <div className="form-group" style={{ width: "75%" }}>
              <label htmlFor="imageUrl" className="label active">
                Imagen
              </label>
              <input type="file" name="imageUrl" onChange={handleFile} />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="description" className="label active">
              Descripción
            </label>
            <input
              type="textarea"
              name="description"
              value={state.property.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories" className="label active">
              Categoría
            </label>
            <input
              list="categories"
              name="categories"
              onChange={handleChange}
            ></input>
            <datalist id="categories">
              <option value="Chillout" />
              <option value="Surfer" />
              <option value="Restaurante" />
              <option value="Discoteca" />
              <option value="Bar" />
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );

  const step2 = (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleGoogleSearch} className="d-flex">
            <div className="form-group" style={{ width: "80%" }}>
              <label htmlFor="search" className="label active">
                Dirección
              </label>
              <input
                type="text"
                name="search"
                value={state.search}
                onChange={handleChangeDirection}
              />
            </div>
            <div style={{ width: "20%" }}>
              <input
                type="submit"
                value="Buscar"
                className="btn-kokomo-flex"
                style={{ padding: "19px" }}
              />
            </div>
          </form>
        </div>
        <div className="col-sm-12 col-md-6">
          <p>Candidato: {state.search}</p>
          <p>Dirección:{" " + state.property.location.name}</p>
          <p>Latitud:{" " + state.property.location.lat}</p>
          <p>Longitud:{" " + state.property.location.long}</p>
        </div>
      </div>
    </div>
  );

  const allSteps = [step1, step2];

  return (
    <div className="container mt-4">
      <Link to="/">
        <div>
          <span className="fa-stack fa-2x kokomo-back-button">
            <i className="fas fa-circle fa-stack-2x circle-back"></i>
            <i className="fas fa-arrow-left fa-stack-1x fa-inverse arrow-back"></i>
          </span>
        </div>
      </Link>
      <div className="hero">
        <h2 className="hero-title text-center">{state.property.name}</h2>
      </div>
      <StepperKokomo
        allSteps={allSteps}
        stepsTitles={stepsTitles}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditProperty;
