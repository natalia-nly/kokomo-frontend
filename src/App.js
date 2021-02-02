import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route.js'
import * as P from './pages'
import NavbarKokomo from './components/main/NavbarKokomo'
import useAuth from './hooks/useAuth'

function App() {
   const DefaultRoutes = () => {
      const { auth } = useAuth()
      return (
         <>
            <NavbarKokomo />
            <Switch>
               <Route
                  exact
                  path="/"
                  component={auth === undefined ? P.LandingPage : P.Home}
               />
               <Route path="/category/:name" component={P.PropertyCategory} />
               <Route path="/login" component={P.Login} />
               <Route path="/signup" component={P.SignUp} />
               <Route path="/signup-local" component={P.SignUpLocal} />
               <ProtectedRoute path="/profile" component={P.Profile} />
               <ProtectedRoute path="/my-favourites" component={P.Favourites} />
               <ProtectedRoute path="/my-bookings" component={P.MyBookings} />
               <ProtectedRoute
                  exact
                  path="/property/create-property"
                  component={P.CreateProperty}
               />
               <ProtectedRoute path="/search" component={P.Search} />
               <Route path="*" component={P.Error404} status={404} />
               <Route path="*" component={P.Error500} status={500} />
            </Switch>
         </>
      )
   }

   return (
      <Switch>
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
            path="/booking/details/:bookingId"
            component={P.BookingDetails}
         />
         <Route component={DefaultRoutes} />
      </Switch>
   )
}

export default App
