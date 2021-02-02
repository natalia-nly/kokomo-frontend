import React, { lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route.js'
import Loader from './components/main/Loader'

//Styles
import { themeKokomo } from './components/styled-components/themeKokomo'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './components/styled-components/MainStyles'

//Google Analytics
import ReactGA from 'react-ga'
import useAuth from './hooks/useAuth'
ReactGA.initialize('UA-178427902-1')
ReactGA.pageview(window.location.pathname + window.location.search)

//Screens
const LandingPage = lazy(() => import('./components/main/LandingPage'))
const NavbarKokomo = lazy(() => import('./components/main/NavbarKokomo'))
const Login = lazy(() => import('./components/auth/Login'))
const SignUp = lazy(() => import('./components/auth/SignUp'))
const SignUpLocal = lazy(() => import('./components/auth/SignUpLocal'))
const Profile = lazy(() => import('./components/profile/Profile'))
const CreateProperty = lazy(() =>
   import('./components/properties/CreateProperty')
)
const Search = lazy(() => import('./components/search/Search'))
const PropertyDetails = lazy(() =>
   import('./components/properties/PropertyDetails')
)
const Home = lazy(() => import('./components/main/Home'))
const Favourites = lazy(() => import('./components/properties/Favourites'))
const MyBookings = lazy(() => import('./components/profile/MyBookings'))
const PropertyCategory = lazy(() =>
   import('./components/properties/PropertyCategory')
)
const Error404 = lazy(() => import('./components/error/Error404'))
const Error500 = lazy(() => import('./components/error/Error500'))
const EditProperty = lazy(() => import('./components/properties/EditProperty'))
const BookingDetails = lazy(() => import('./components/profile/BookingDetails'))

function App() {
   const DefaultRoutes = () => {
      const { auth } = useAuth()
      return (
         <>
            <NavbarKokomo />
            <Switch>
               <Route exact path="/">
                  {auth === undefined ? <LandingPage /> : <Home />}
               </Route>

               <Route path="/category/:name" component={PropertyCategory} />

               <Route path="/login" component={Login} />
               <Route path="/signup" component={SignUp} />
               <Route path="/signup-local" component={SignUpLocal} />
               <ProtectedRoute path="/profile" component={Profile} />

               <ProtectedRoute path="/my-favourites" component={Favourites} />
               <ProtectedRoute path="/my-bookings" component={MyBookings} />
               <ProtectedRoute
                  exact
                  path="/property/create-property"
                  component={CreateProperty}
               />
               <ProtectedRoute path="/search" component={Search} />
               <Route path="*" component={Error404} status={404} />
               <Route path="*" component={Error500} status={500} />
            </Switch>
         </>
      )
   }

   return (
      <ThemeProvider theme={themeKokomo}>
         <GlobalStyle />
         <Suspense fallback={<Loader />}>
            <Switch>
               <ProtectedRoute
                  exact
                  path="/property/create-property"
                  component={CreateProperty}
               />
               <ProtectedRoute
                  path="/property/edit/:propertyId"
                  component={EditProperty}
               />
               <Route
                  path="/property/:propertyId"
                  component={PropertyDetails}
               />
               <Route
                  path="/booking/details/:bookingId"
                  render={(props) => <BookingDetails {...props} />}
               />

               <Route component={DefaultRoutes} />
            </Switch>
         </Suspense>
      </ThemeProvider>
   )
}

export default App
