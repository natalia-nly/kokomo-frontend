import React, { useState } from "react";
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

function CreateProperty() {
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
    name: "",
    description: "",
    categories: [],
    mainImage: "",
    file: null,
    location: {
      name: "",
      lat: 0,
      long: 0,
    },
    openingHours: [
      {
        openingDays: {
          openingDay: null,
          closingDay: null,
        },
        weekDays: [],
        openingTimes: [
          {
            openingTime: 0,
            closingTime: 0,
          },
        ],
      },
    ],
    bookingDuration: 0,
    availablePlaces: 0,
  };

  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("mainImage", state.file);

    axios
      .post("http://localhost:5000/api/property/create-property", uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("file uploaded", response.data)
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setState({ ...state, file: e.target.files[0] });
    // const uploadData = new FormData()
    // uploadData.append("mainImage", state.mainImage)

    //   axios.post("http://localhost:5000/api/properties/upload", uploadData)
    //   .then(response => {
    //       console.log("file uploaded", response.data)
    //       setState({ ...state, mainImage: response.data.path });
    //     })
  };

  const handleLocationName = (e) => {
    setState({
      ...state,
      location: {
        ...state.location,
        name: e.target.value,
      },
    });
  };

  const handleOpeningDay = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingDays.openingDay = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleClosingDay = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingDays.closingDay = e.target.value;
    setState({
      ...state,
      openingHours: openingHours,
    });
  };

  const handleOpeningTime = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingTimes[0].openingTime = e.target.value;
    setState({
      ...state,
      "openingHours.openingTimes": openingHours,
    });
  };

  const handleClosingTime = (e) => {
    let openingHours = [...state.openingHours];
    openingHours[0].openingTimes[0].closingTime = e.target.value;
    setState({
      ...state,
      "openingHours.openingTimes": openingHours,
    });
  };

  const handleWeekdays = (e) => {
    let weekDays = [...state.openingHours];
    if (weekDays[0].weekDays.includes(parseInt(e.target.value))) {
      const index = weekDays[0].weekDays.indexOf(parseInt(e.target.value));
      weekDays[0].weekDays.splice(index, 1);
    } else {
      weekDays[0].weekDays.push(parseInt(e.target.value));
    }

    setState({
      ...state,
      openingHours: weekDays,
    });
  };

  function getSteps() {
    return [<p>Datos principales</p>, <p>Horarios</p>, <p>El local</p>];
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
                    value={state.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mainImage" className="label active">
                    Imagen Principal
                  </label>
                  <input type="file" name="mainImage" onChange={handleFile} />
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
                    value={state.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="label active">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={state.location.name}
                    onChange={handleLocationName}
                  />
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
                  <label htmlFor="openingDay" className="label active">
                    Día de apertura
                  </label>
                  <input
                    type="date"
                    name="openingDay"
                    value={state.openingHours[0].openingDays.openingDay}
                    onChange={handleOpeningDay}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="closingDay" className="label active">
                    Día de cierre
                  </label>
                  <input
                    type="date"
                    name="closingDay"
                    value={state.openingHours[0].openingDays.closingDay}
                    onChange={handleClosingDay}
                  />
                </div>

                <h6>Días de la semana</h6>
                <div className="form-group">
                  <div className="row mt-3">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="monday"
                          value={1}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="monday"
                        >
                          Lunes
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="tuesday"
                          value={2}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="tuesday"
                        >
                          Martes
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="wednesday"
                          value={3}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="wednesday"
                        >
                          Miércoles
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="thursday"
                          value={4}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="thursday"
                        >
                          Jueves
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="friday"
                          value={5}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="friday"
                        >
                          Viernes
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="saturday"
                          value={6}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="saturday"
                        >
                          Sábado
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="sunday"
                          value={0}
                          onChange={handleWeekdays}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sunday"
                        >
                          Domingo
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="openingHours" className="label active">
                    Hora de apertura
                  </label>
                  <input
                    type="number"
                    name="openingHours"
                    value={state.openingHours[0].openingDays.openingTime}
                    onChange={handleOpeningTime}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="closingHours" className="label active">
                    Hora de cierre
                  </label>
                  <input
                    type="number"
                    name="closingHours"
                    value={state.openingHours[0].openingDays.closingTime}
                    onChange={handleClosingTime}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingDuration" className="label active">
                    Duración de la reserva (en minutos)
                  </label>
                  <input
                    type="number"
                    name="bookingDuration"
                    value={state.bookingDuration}
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
                    value={state.availablePlaces}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return "This is the bit I really care about!";
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
        <h2 className="hero-title">Crea tu local</h2>
        <h2 className="hero-subtitle">
          Rellena los datos de tu local y consigue reservas
        </h2>
        <h2 className="hero-arrow-phone mdi mdi-arrow-down"></h2>
        <h2 className="hero-arrow-desktop mdi mdi-arrow-down"></h2>
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
              <div>
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
                    Crear propiedad
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

export default CreateProperty;