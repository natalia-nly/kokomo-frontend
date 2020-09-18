import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavbarKokomo from "./components/NavbarKokomo";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import SignUpLocal from "./components/auth/SignUpLocal";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./services/auth/protected-route.js";
import CreateProperty from "./components/properties/CreateProperty";
import AuthService from "./services/auth/auth-service";
import Search from "./components/search/Search";
import PropertyDetails from "./components/properties/PropertyDetails";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import MyBookings from "./components/profile/MyBookings";
import PropertyCategory from "./components/properties/PropertyCategory";
import Error404 from "./components/error/Error404";
import Error500 from "./components/error/Error500";
import EditProperty from "./components/properties/EditProperty";
import BookingDetails from "./components/profile/BookingDetails";

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
      <div>
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
        </Switch>
      </div>
    );
  };

  return (
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
      <Route path="*" component={Error404} status={404} />
      <Route path="*" component={Error500} status={500} />
    </Switch>
  );
}

export default App;
