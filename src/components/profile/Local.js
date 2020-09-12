import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

let local = <></>;
let alertMessage = <></>;

const initialState = {
  alert: false,
};

const Local = (props) => {
  let history = useHistory();

  const [state, setState] = useState(initialState);
  console.log(process.env.REACT_APP_API_URL + "/property/" + props.property);

  useEffect(() => {
    let propertyId = props.property;
    axios
      .get(process.env.REACT_APP_API_URL + "/property/" + propertyId, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("CONSOLE LOG DESDE AXIOS GET mi local:", response.data);
        setState({
          ...state,
          property: response.data,
        });
      });
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const deleteProperty = () => {
    if (!state.property.bookings.length) {
      axios
        .get(
          process.env.REACT_APP_API_URL + "/property/delete/" + props.property,

          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          refreshPage();
        });
    } else {
      console.log(
        "Por favor, cancele todos las reservas de este local primero"
      );
      setState({ ...state, alert: true });
    }
  };

  if (state.alert) {
    alertMessage = (
      <Alert variant="warning mt-4">
        Por favor, cancele todos las reservas de este local primero.{" "}
        <Link to="/my-bookings">Ver reservas</Link>
      </Alert>
    );
  }

  if (state.property) {
    local = (
      <>
        <tr>
          <td>
            <Link to={"/property/" + props.property}>
              <h2 className="title-search-home">{state.property.name}</h2>
              <p className="mdi mdi-map-marker-radius mb-4">
                {" "}
                {state.property.location.name}
              </p>
            </Link>
          </td>
          <td>
            <Link
              type="submit"
              className="btn-kokomo btn-kokomo-grey mr-3 mb-4"
              to={"/property/edit/" + props.property}
            >
              <i className="fas fa-pen"></i>
            </Link>
            <button
              type="submit"
              className="btn-kokomo btn-kokomo-danger mr-3 mb-4"
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

  return <div>{local}</div>;
};

export default Local;
