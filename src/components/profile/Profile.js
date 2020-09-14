import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth/auth-service";
import Messages from "./Messages";
import Local from "./Local";
const service = new AuthService();


const initialState = {};

const Profile = (props) => {
  console.log("estamos en profile!!");
  console.log(props.loggedInUser);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    service.loggedin().then((response) => {
      console.log(response.messages);
      setState({
        ...state,
        user: response,
      });
    });
  }, []);

  let properties = <></>;


  if (state.user && state.user.ownProperties) {
    console.log("Property desde el mapa de ownproperties: ", state.user.ownProperties)
    properties = state.user.ownProperties.map((property, index) => (
      <Local key={index} property={property} />
    ));
  }

  return (
    <div>
      <div className="beach-background">
        <div className="text-right">
          <Link to="/profile/edit" className="btn-kokomo btn-kokomo-grey mr-3">
            Configuración
          </Link>
          <Link to="/logout" className="btn-kokomo btn-kokomo-danger">
            Cerrar sesión
          </Link>
        </div>
      </div>

      <div
        className="text-center"
        style={{
          borderRadius: "30px",
          marginTop: "-30px",
          backgroundColor: "white",
          paddingBottom: "30px",
        }}
      >
        <img src={props.loggedInUser.avatar} alt="Avatar" className="avatar" />

        <h2>Hola {props.loggedInUser.username}!</h2>
        <p>email: {props.loggedInUser.email}</p>
        <p>Número de teléfono: {props.loggedInUser.telNumber}</p>
      </div>
      <div className="body-container">
        <div className="row">
          <div className="col">
            <Link
              to="/search"
              className="btn-kokomo btn-kokomo-success float-right"
            >
              Crear una nueva reserva
            </Link>
            <div className="col">
              {props.loggedInUser.owner ? (
                <Link
                  to="/property/create-property"
                  className="btn-kokomo btn-kokomo-success float-right mr-4"
                >
                  Crear un nuevo local
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            <table className="table">
              <tbody>{properties}</tbody>
            </table>
          </div>
          <div className="col-md-4">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
