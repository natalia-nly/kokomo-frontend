import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Messages from '../components/profile/Messages'
import Local from '../components/profile/Local'
import Badge from 'react-bootstrap/Badge'
import { SectionTitleStyle, SectionSubtitleStyle } from '../styles/titles'
import useAuth from '../hooks/useAuth'
import { ProfileStyled } from '../styles/profileStyle'

const Profile = () => {
  const { auth, logout, setReloadUser } = useAuth()
  const [showConfig, setShowConfig] = useState(false)

  let properties = <></>
  let allBookingsOwner = 0

  if (auth?.ownProperties) {
    properties = auth.ownProperties.map((property, index) => (
      <Local key={index} property={property} />
    ))

    auth.ownProperties.map((property) => {
      if (property.bookings) {
        allBookingsOwner += property.bookings.length
      }
      return allBookingsOwner
    })
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  const addOwner = (e) => {
    // EDIT USER DATA
    setReloadUser()
  }

  const hideForm = () => setShowConfig(false)

  let configUser = <></>

  const handleConfig = () => setShowConfig(true)

  if (showConfig) {
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
                  //value={state.user.telNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="submit"
                  value="Guardar cambios"
                  className="btn-kokomo btn-kokomo-success w-100"
                  style={{
                    padding: '19px'
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProfileStyled>
      <div className="container py-5">
        <SectionTitleStyle>
          <i className="mdi mdi-account-circle"></i> Mi perfil
        </SectionTitleStyle>

        <div className="row">
          <div className="col-md-6">
            <div className="card-kokomo">
              <div className="beach-background">
                <div className="float-right">
                  <button
                    onClick={() => handleConfig()}
                    className="btn-kokomo-circle btn-kokomo-white"
                  >
                    <i className="mdi mdi-account-edit"></i>
                  </button>
                </div>
              </div>

              <div className="profile-card">
                <img src={auth.avatar} alt="Avatar" className="avatar" />
                <h2>{auth.username}</h2>
                <p>{auth.email}</p>
                <p>{auth.telNumber ? auth.telNumber : ' '}</p>

                {!auth.owner && (
                  <>
                    <div className="border-top mt-4 pt-4">
                      <button onClick={addOwner} className="logout-kokomo">
                        Tengo un local
                      </button>
                    </div>
                  </>
                )}

                <div className="border-top mt-4 pt-4">
                  <button onClick={() => logout()} className="logout-kokomo">
                    <i className="mdi mdi-logout-variant"></i> Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
            {auth.owner ? (
              <>
                <div className="card-kokomo p-4 mt-4">
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
              <div className="card-kokomo p-4 mt-4">
                <Link
                  to="/search"
                  className="btn-kokomo-circle btn-kokomo-success float-right"
                >
                  <i className="mdi mdi-plus"></i>
                </Link>
                <SectionSubtitleStyle>Mi última reserva</SectionSubtitleStyle>
                {auth.bookings?.length ? (
                  <>
                    <div>
                      <Badge variant="info">
                        {auth.bookings[auth.bookings.length - 1].bookingRef}
                      </Badge>
                      <p>
                        <i className="far fa-calendar-alt"></i> Día:{' '}
                        {auth.bookings[auth.bookings.length - 1].day}
                      </p>
                      <p>
                        <i className="far fa-clock"></i> Hora:{' '}
                        {auth.bookings[auth.bookings.length - 1].time}
                      </p>
                      <p>
                        <i className="fas fa-users"></i> Número de personas:{' '}
                        {auth.bookings[auth.bookings.length - 1].guests}
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
            <div className="card-kokomo dark-blue p-4">
              <h3 className="datos-kokomo">
                {auth.owner ? (
                  <>
                    <span>{allBookingsOwner}</span>
                    Reservas
                  </>
                ) : (
                  <>
                    <span>{auth.bookings?.length || 0}</span>
                    Reservas
                  </>
                )}
              </h3>
            </div>
            <div className="card-kokomo light-blue p-4 mt-4">
              <h3 className="datos-kokomo">
                {auth.owner ? (
                  <>
                    <span>{auth.ownProperties.length}</span>
                    Locales
                  </>
                ) : (
                  <>
                    <span>{auth.favourites?.length || 0}</span>
                    Favoritos
                  </>
                )}
              </h3>
            </div>
            <div className="card-kokomo p-4 mt-4">
              <SectionSubtitleStyle>Notificaciones</SectionSubtitleStyle>
              <Messages />
            </div>
          </div>
        </div>
      </div>

      {configUser}
    </ProfileStyled>
  )
}

export default Profile
