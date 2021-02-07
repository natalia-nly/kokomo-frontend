import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route.js'
import * as P from './pages'
import useAuth from './hooks/useAuth'
import UserNavbar from './components/navbar/UserNavbar'
import MainNavbar from './components/navbar/MainNavbar'
import Loader from './components/main/Loader.js'

function App() {
  const { auth, loading } = useAuth()
  if (loading) return <Loader />

  return (
    <>
      {auth !== undefined ? <UserNavbar /> : <MainNavbar />}

      <Switch>
        <Route exact path="/" component={P.Home} />
        <Route path="/category/:name" component={P.PropertyCategory} />
        <Route path="/login" component={P.Login} />
        <Route path="/signup" component={P.SignUp} />
        <Route path="/signup-local" component={P.SignUpLocal} />
        <ProtectedRoute path="/profile" component={P.Profile} />
        <ProtectedRoute path="/notifications" component={P.Notifications} />
        <ProtectedRoute path="/my-favourites" component={P.Favourites} />
        <ProtectedRoute path="/my-bookings" component={P.MyBookings} />
        <ProtectedRoute path="/search" component={P.Search} />
        <ProtectedRoute
          exact
          path="/property/create-property"
          component={P.CreateProperty}
        /> 
        <ProtectedRoute
          path="/property/edit/:propertyId"
          component={P.EditProperty}
        />
        <Route path="/property/:propertyId" component={P.PropertyDetails} />
        <Route
          path="/booking/:bookingId"
          component={P.BookingDetails}
        />
        <Route path="*" component={P.Error404} status={404} />
        <Route path="*" component={P.Error500} status={500} />
      </Switch>
    </>
  )
}

export default App
