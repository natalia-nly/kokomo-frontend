import React, { useState, useEffect, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./services/auth/protected-route.js";
import AuthService from "./services/auth/auth-service";
import Loader from "./components/main/Loader";

//Styles
import { themeKokomo } from "./components/styled-components/themeKokomo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/styled-components/MainStyles";

//Google Analytics
import ReactGA from "react-ga";
ReactGA.initialize("UA-178427902-1");
ReactGA.pageview(window.location.pathname + window.location.search);

//Screens
const LandingPage = lazy(() => import("./components/main/LandingPage"));
const NavbarKokomo = lazy(() => import("./components/main/NavbarKokomo"));
const Login = lazy(() => import("./components/auth/Login"));
const Logout = lazy(() => import("./components/auth/Logout"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const SignUpLocal = lazy(() => import("./components/auth/SignUpLocal"));
const Profile = lazy(() => import("./components/profile/Profile"));
const CreateProperty = lazy(() =>
  import("./components/properties/CreateProperty")
);
const Search = lazy(() => import("./components/search/Search"));
const PropertyDetails = lazy(() =>
  import("./components/properties/PropertyDetails")
);
const Home = lazy(() => import("./components/main/Home"));
const Favourites = lazy(() => import("./components/properties/Favourites"));
const MyBookings = lazy(() => import("./components/profile/MyBookings"));
const PropertyCategory = lazy(() =>
  import("./components/properties/PropertyCategory")
);
const Error404 = lazy(() => import("./components/error/Error404"));
const Error500 = lazy(() => import("./components/error/Error500"));
const EditProperty = lazy(() => import("./components/properties/EditProperty"));
const BookingDetails = lazy(() =>
  import("./components/profile/BookingDetails")
);

const initialState = {
  loggedInUser: null,
};

function App() {
  const [state, setState] = useState(initialState);

  const getTheUser = (userObj) => {
    setState((state) => ({ loggedInUser: userObj }));
  };

  const reset = () => {
    setState(initialState);
  };

  const service = new AuthService();

  useEffect(() => {
    let saveData = JSON.parse(localStorage.saveData || null) || {};
    // Store your data.
    function saveStuff(obj) {
      saveData.obj = obj;
      localStorage.saveData = JSON.stringify(saveData);
    }

    function loadStuff() {
      return saveData.obj;
    }
    if (state.loggedInUser === null) {
      if (loadStuff() !== (null || undefined)) {
        getTheUser(loadStuff());
      } else {
        service.loggedin().then((response) => {
          saveStuff(response);
          getTheUser(loadStuff());
        });
      }
    }
  }, [service, state.loggedInUser]);

  const DefaultRoutes = () => {
    return (
      <>
        <NavbarKokomo
          getTheUser={state.loggedInUser}
          key={state.loggedInUser}
        />
        <Switch>
          <Route exact path="/">
            {state.loggedInUser === null ? <LandingPage /> : <Home />}
          </Route>

          <Route
            path="/category/:name"
            render={(props) => (
              <PropertyCategory {...props} getTheUser={state.loggedInUser} />
            )}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} callback={getTheUser} />}
          />
          <Route
            path="/signup"
            render={(props) => (
              <>
                <SignUp {...props} callback={getTheUser} />
              </>
            )}
          />
          <Route
            path="/signup-local"
            render={(props) => (
              <>
                <SignUpLocal {...props} callback={getTheUser} />
              </>
            )}
          />
          <ProtectedRoute
            key={state.loggedInUser}
            user={state.loggedInUser}
            callback={getTheUser}
            path="/profile"
            component={Profile}
          />

          <ProtectedRoute
            key={state.loggedInUser}
            user={state.loggedInUser}
            callback={getTheUser}
            path="/my-favourites"
            component={Favourites}
          />
          <ProtectedRoute
            key={state.loggedInUser}
            user={state.loggedInUser}
            callback={getTheUser}
            path="/my-bookings"
            component={MyBookings}
          />
          <ProtectedRoute
            user={state.loggedInUser}
            exact
            callback={getTheUser}
            path="/property/create-property"
            component={CreateProperty}
          />
          <ProtectedRoute
            user={state.loggedInUser}
            path="/search"
            component={Search}
          />

          <Route
            exact
            path="/logout"
            render={(props) => (
              <Logout {...props} reset={reset} callback={getTheUser} />
            )}
          />
          <Route path="*" component={Error404} status={404} />
          <Route path="*" component={Error500} status={500} />
        </Switch>
      </>
    );
  };

  return (
    <ThemeProvider theme={themeKokomo}>
      <GlobalStyle />
      <Suspense fallback={<Loader />}>
        <Switch>
          <ProtectedRoute
            user={state.loggedInUser}
            exact
            callback={getTheUser}
            path="/property/create-property"
            component={CreateProperty}
          />

          <ProtectedRoute
            user={state.loggedInUser}
            callback={getTheUser}
            path="/property/edit/:propertyId"
            component={EditProperty}
          />

          <Route
            path="/property/:propertyId"
            render={(props) => (
              <PropertyDetails {...props} getTheUser={state.loggedInUser} />
            )}
          />
          <Route
            path="/booking/details/:bookingId"
            render={(props) => <BookingDetails {...props} />}
          />

          <Route component={DefaultRoutes} />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
