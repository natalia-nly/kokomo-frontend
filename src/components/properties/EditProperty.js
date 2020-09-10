import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import RoomIcon from "@material-ui/icons/Room";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

function EditProperty(props) {
  let history = useHistory();

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
    },
    active: {
      color: "#784af4",
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    completed: {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      "& $line": {
        backgroundImage:
          "linear-gradient( 95deg,#ffba69 0%,#ffba69 50%,#ffba69 100%)",
      },
    },
    completed: {
      "& $line": {
        backgroundImage:
          "linear-gradient( 95deg,#ffba69 0%,#ffba69 50%,#ffba69 100%)",
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      backgroundImage:
        "linear-gradient( 136deg, #ffba69 0%, #ec9834 50%, #cc7309 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundImage:
        "linear-gradient( 136deg, #ffba69 0%, #ec9834 50%, #cc7309 100%)",
    },
  });

  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: <RestaurantIcon />,
      2: <ScheduleIcon />,
      3: <RoomIcon />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    buttonActive: {
      backgroundColor: "#3294bb",
      color: "#ffffff",
    },
    buttonSuccess: {
      backgroundColor: "#28a745",
      color: "#ffffff",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

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
      bookingDuration: 0,
      availablePlaces: 0,
    },
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log(props);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/property/" +
          props.match.params.propertyId,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET", response);

        setState({
          ...state,
          property: response.data,
        });
      });
  }, []);

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
      bookingDuration: state.property.bookingDuration,
      availablePlaces: state.property.availablePlaces,
      mainImage: state.property.mainImage,
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/property/edit/" + state.property._id,
        body,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("file uploaded", response.data);
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
    // setState({ ...state, file: e.target.files[0] });
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("mainImage", e.target.files[0]);
    axios
      .post(process.env.REACT_APP_API_URL + "/property/upload", uploadData)
      .then((response) => {
        console.log("File upload successful:", response.data);
        setState({
          ...state,
          property: { ...state.property, mainImage: response.data.path },
        });
      });
  };

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    // buscar la direccion y mostrar un PIN en el mapa con la dirección
    axios
      .get(
        process.env.REACT_APP_API_URL + "/search/maps?search=" + state.search
      )
      .then((response) => {
        console.log(response.data);
        console.log(state);
        // volver a renderizar el mapa con CENTER = lat, lng y un PIN =  lat, lng
        setState({
          ...state,
          search: response.data.candidates[0].name,
          property: {
            ...state.property,
            location: {
              lat: response.data.candidates[0].geometry.location.lat,
              long: response.data.candidates[0].geometry.location.lng,
              name: response.data.candidates[0].formatted_address,
            },
          },
        });
      });
  };

  function getSteps() {
    return [<p>Datos principales</p>, <p>El local</p>];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
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
      case 1:
        return (
          <div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="bookingDuration" className="label active">
                    Duración de la reserva (en minutos)
                  </label>
                  <input
                    type="number"
                    name="bookingDuration"
                    value={state.property.bookingDuration}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="availablePlaces" className="label active">
                    Plazas
                  </label>
                  <input
                    type="number"
                    name="availablePlaces"
                    value={state.property.availablePlaces}
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                <p>Candidato: {state.search}</p>
                <p>Dirección:{" " + state.property.location.name}</p>
                <p>Latitud:{" " + state.property.location.lat}</p>
                <p>Longitud:{" " + state.property.location.long}</p>
              </div>
            </div>
          </div>
        );

      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="body-container">
      <div className="hero">
        <h2 className="hero-title text-center">{state.property.name}</h2>
      </div>
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions} component="div">
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions} component="div">
                {getStepContent(activeStep)}
              </Typography>
              <div className="text-center mt-5">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Anterior
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="#3294bb"
                    onClick={handleSubmit}
                    className={classes.buttonSuccess}
                  >
                    Guardar los cambios
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.buttonActive}
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
