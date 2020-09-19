import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth/auth-service";
import Messages from "./Messages";
import Local from "./Local";
import ProfileService from "../../services/profile/profile-service";
import Badge from "react-bootstrap/Badge";
import { SectionTitleStyle, SectionSubtitleStyle } from "../styled-components/titles";

const service = new AuthService();
const profileService = new ProfileService();

const initialState = {
  showConfig: false,
  user: {
    avatar: "",
    bookings: [],
    favourites: [],
    owner: false,
    ownProperties: [],
    _id: "",
    username: "",
    email: "",
    messages: [],
    telNumber: "",
  },
};

const Profile = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    service.infoUser().then((response) => {
      setState((state) => ({
        ...state,
        user: response,
      }));
    });
  }, [props.loggedInUser._id]);

  let properties = <></>;
  let allBookingsOwner = 0;

  if (state.user && state.user.ownProperties) {
    properties = state.user.ownProperties.map((property, index) => (
      <Local key={index} property={property} />
    ));

    state.user.ownProperties.map((property) => {
      if (property.bookings) {
        allBookingsOwner += property.bookings.length;
      }
      return allBookingsOwner;
    });
  }

  const handleChange = (e) => {
    setState({
      ...state,
      user: {
        ...state.user,
        telNumber: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      telNumber: state.user.telNumber,
    };
    profileService.editPhone(body).then((response) => {
      setState({
        ...state,
        showConfig: false,
      });
    });
  };

  const addOwner = (e) => {
    profileService.addOwner().then((response) => {
      setState({ ...state, user: { ...state.user, owner: true } });
    });
  };

  const hideForm = () => {
    setState({ ...state, showConfig: false });
  };

  let configUser = <></>;

  const handleConfig = () => {
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
        style={{
          marginTop: "0",
          paddingTop: "10px",
          paddingBottom: "50px",
          marginBottom: "0px",
        }}
      >
        <SectionTitleStyle>
          <i className="mdi mdi-account-circle"></i> Mi perfil
        </SectionTitleStyle>

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
                <img src={state.user.avatar} alt="Avatar" className="avatar" />
                <SectionSubtitleStyle center>{props.loggedInUser.username}</SectionSubtitleStyle>
                <p>{state.user.email}</p>
                <p>{state.user.telNumber ? `${state.user.telNumber}` : " "}</p>

                {!state.user.owner ? (
                  <>
                    <div className="border-top mt-4 pt-4">
                      <button onClick={addOwner} className="logout-kokomo">
                        Tengo un local
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="border-top mt-4 pt-4">
                  <Link to="/logout" className="logout-kokomo">
                    <i className="mdi mdi-logout-variant"></i> Cerrar sesión
                  </Link>
                </div>
              </div>
            </div>
            {state.user.owner ? (
              <>
                <div
                  className="card-kokomo"
                  style={{ padding: "20px", marginTop: "30px" }}
                >
                  <Link
                    to="/property/create-property"
                    className="btn-kokomo-circle btn-kokomo-success float-right"
                  >
                    <i className="mdi mdi-plus"></i>
                  </Link>
                  <SectionSubtitleStyle>Mis locales</SectionSubtitleStyle>

                  <table className="table mt-4">
                    <tbody>{properties}</tbody>
                  </table>
                </div>
              </>
            ) : (
              <div
                className="card-kokomo"
                style={{ padding: "20px", marginTop: "30px" }}
              >
                <Link
                  to="/search"
                  className="btn-kokomo-circle btn-kokomo-success float-right"
                >
                  <i className="mdi mdi-plus"></i>
                </Link>
                <SectionSubtitleStyle>Mi última reserva</SectionSubtitleStyle>
                {state.user.bookings.length ? (
                  <>
                    <div>
                      <Badge variant="info">
                        {
                          state.user.bookings[state.user.bookings.length - 1]
                            .bookingRef
                        }
                      </Badge>
                      <p>
                        <i className="far fa-calendar-alt"></i> Día:{" "}
                        {
                          state.user.bookings[state.user.bookings.length - 1]
                            .day
                        }
                      </p>
                      <p>
                        <i className="far fa-clock"></i> Hora:{" "}
                        {
                          state.user.bookings[state.user.bookings.length - 1]
                            .time
                        }
                      </p>
                      <p>
                        <i className="fas fa-users"></i> Número de personas:{" "}
                        {
                          state.user.bookings[state.user.bookings.length - 1]
                            .guests
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <img
                        src="/images/calendar.png"
                        className="black-white"
                        alt="Sin reservas"
                      />
                      <p>Todavía no tienes reservas</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <div
              className="card-kokomo"
              style={{ padding: "20px", backgroundColor: "#207190" }}
            >
              <h3 className="datos-kokomo">
                {state.user.owner ? (
                  <>
                    <span>{allBookingsOwner}</span>
                    Reservas
                  </>
                ) : (
                  <>
                    <span>{state.user.bookings.length}</span>
                    Reservas
                  </>
                )}
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
                {state.user.owner ? (
                  <>
                    <span>{state.user.ownProperties.length}</span>
                    Locales
                  </>
                ) : (
                  <>
                    <span>{state.user.favourites.length}</span>
                    Favoritos
                  </>
                )}
              </h3>
            </div>
            <div
              className="card-kokomo"
              style={{ padding: "20px", marginTop: "30px" }}
            >
              <SectionSubtitleStyle>Notificaciones</SectionSubtitleStyle>
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
