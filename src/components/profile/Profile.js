import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth/auth-service";
import Messages from "./Messages";
import Local from "./Local";

const service = new AuthService();
const initialState = { showConfig: false };

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
    console.log(
      "Property desde el mapa de ownproperties: ",
      state.user.ownProperties
    );
    properties = state.user.ownProperties.map((property, index) => (
      <Local key={index} property={property} />
    ));
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const hideForm = () => {
    setState({ ...state, showConfig: false });
  };

  let configUser = <></>;

  const handleConfig = () => {
    console.log("ENTRANDO A HANDLE CONFIG");
    setState({ ...state, showConfig: true });
  };

  if (state.showConfig) {
    configUser = (
      <div className="text-center d-flex align-items-center justify-content-center kokomo-popup">
        <div className="row align-middle justify-content-center w-100">
          <div className="col-md-4 align-self-center fondo-kokomo">
            <img
              src="/images/config.png"
              className="emoji-img"
              alt="Horas disponibles"
            />
            <button onClick={hideForm} className="close-btn">
              <i className="fas fa-times"></i>
            </button>
            <p className="mb-3">
              No puedes modificar tu nombre de usuario ni tu correo
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="telNumber" className="label active">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telNumber"
                  value={state.user.telNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="submit"
                  value="Guardar cambios"
                  className="btn-kokomo btn-kokomo-success w-100"
                  style={{
                    padding: "19px",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafb", minHeight: "100vh" }}>
      <div
        className="body-container"
        style={{ marginTop: "0", paddingTop: "10px", paddingBottom: "50px", marginBottom: "0px" }}
      >
      <h3 className="section-title mt-4 mdi mdi-account-circle">
        {" "}Mi perfil
      </h3>
      <div className="row">
        <div className="col-md-6">
          <div className="card-kokomo">
            <div className="beach-background">
              <div className="text-right">
                <button
                  onClick={() => handleConfig()}
                  className="btn-kokomo-circle btn-kokomo-white"
                >
                  <i className="mdi mdi-account-edit"></i>
                </button>
              </div>
            </div>

            <div
              className="text-center"
              style={{
                borderRadius: "26px 26px 0 0",
                marginTop: "-30px",
                backgroundColor: "white",
                paddingBottom: "30px",
              }}
            >
              <img
                src={props.loggedInUser.avatar}
                alt="Avatar"
                className="avatar"
              />

              <h2 className="title-profile">{props.loggedInUser.username}</h2>
              <p>{props.loggedInUser.email}</p>
              <p>
                {props.loggedInUser.telNumber
                  ? `Número de teléfono: ${props.loggedInUser.telNumber}`
                  : " "}
              </p>
              <div className="border-top mt-4 pt-4">
                <Link to="/logout" className="logout-kokomo">
                  <i className="mdi mdi-logout-variant"></i> Cerrar sesión
                </Link>
              </div>
            </div>
          </div>
          <div
            className="card-kokomo"
            style={{ padding: "20px", marginTop: "30px" }}
          >
            <Link
              to="/property/create-property"
              className="btn-kokomo-circle btn-kokomo-success float-right"
            >
              <i class="mdi mdi-plus"></i>
            </Link>
            <h2 className="title-search-home"> Mis locales</h2>

            <table className="table mt-4">
              <tbody>{properties}</tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card-kokomo"
            style={{ padding: "20px", backgroundColor: "#207190" }}
          >
            <h3 className="datos-kokomo">
              <span>{state.user ? state.user.bookings.length : 0}</span>
              Reservas
            </h3>
          </div>
          <div
            className="card-kokomo"
            style={{
              padding: "20px",
              marginTop: "30px",
              backgroundColor: "#3394ba",
            }}
          >
            <h3 className="datos-kokomo">
              <span>
                {state.user && state.user.ownProperties
                  ? state.user.ownProperties.length
                  : 0}
              </span>
              Locales
            </h3>
          </div>
          <div
            className="card-kokomo"
            style={{ padding: "20px", marginTop: "30px" }}
          >
            <h2 className="title-search-home">Notificaciones</h2>
            <Messages />
          </div>
        </div>
      </div>
      </div>

      {configUser}
    </div>
  );
};

export default Profile;
