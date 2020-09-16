import React, { useState} from "react";
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


  const refreshPage = () => {
    window.location.reload(false);
  };

  const deleteProperty = () => {
    if (props.property.bookings.length) {
      console.log(
        "Por favor, cancele todos las reservas de este local primero"
      );
      setState({ ...state, alert: true });
    } else {
      service.deleteProperty(props.property._id).then((response) => {
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

  if (props.property) {
    local = (
      <>
        <tr>
          <td>
            <img src={props.property.mainImage} className="mini-kokomo" alt={props.property.name}/>
          </td>
          <td>
            <Link to="/my-bookings">
              <h2 className="title-profile">{props.property.name}</h2>
              <p className="mdi mdi-calendar">
                {" "}
                {props.property.bookings ? props.property.bookings.length : "0"} reservas
              </p>
            </Link>
          </td>
          <td className="text-right">
            <Link
              type="submit"
              className="btn-kokomo-circle btn-kokomo-grey mr-2"
              to={"/property/edit/" + props.property._id}
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
