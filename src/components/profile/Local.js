import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import PropertyService from "../../services/property/property-service";

const service = new PropertyService();

let local = <></>;
let alertMessage = <></>;

const initialState = {
  alert: false,
};

const Local = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    service.propertyDetails(props.property).then((response) => {
      console.log(response);
      setState({
        ...state,
        property: response,
      });
    });
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const deleteProperty = () => {
    if (state.property.bookings.length) {
      console.log(
        "Por favor, cancele todos las reservas de este local primero"
      );
      setState({ ...state, alert: true });
    } else {
      service.deleteProperty(state.property._id).then((response) => {
        console.log(response);
        refreshPage();
      });
    }
  };

  if (state.alert) {
    alertMessage = (
      <tr>
        <td colspan="3">
          <Alert variant="warning">
            Por favor, cancele todos las reservas de este local primero.{" "}
            <Link to="/my-bookings">Ver reservas</Link>
          </Alert>
        </td>
      </tr>
    );
  }

  if (state.property) {
    local = (
      <>
        <tr>
          <td>
            <img src={state.property.mainImage} className="mini-kokomo" alt={state.property.name}/>
          </td>
          <td>
            <Link to="/my-bookings">
              <h2 className="title-profile">{state.property.name}</h2>
              <p className="mdi mdi-calendar">
                {" "}
                {state.property.bookings.length} reservas
              </p>
            </Link>
          </td>
          <td className="text-right">
            <Link
              type="submit"
              className="btn-kokomo-circle btn-kokomo-grey mr-2"
              to={"/property/edit/" + props.property}
            >
              <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <button
              type="submit"
              className="btn-kokomo-circle btn-kokomo-danger"
              onClick={() => deleteProperty()}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        {alertMessage}
      </>
    );
  }

  return <>{local}</>;
};

export default Local;
