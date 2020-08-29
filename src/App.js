import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import SignUpLocal from "./components/auth/SignUpLocal";
import Profile from "./components/Profile";
import ProtectedRoute from './auth/protected-route.js'
import CreateProperty from "./components/CreateProperty";

function App() {
  const initialState = {
    loggedInUser: null
  }

  const [state, setState] = useState(initialState)

  const getTheUser = (userObj) => {
    setState({loggedInUser: userObj})
  }

  return (
    <div>
    <Navbar getTheUser={state.loggedInUser} key={state.loggedInUser}/>  

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route
            path='/login'
            render={(props) => <Login {...props} callback={getTheUser}/>}/>

        <Route
            path='/signup'
            render={(props) => <SignUp {...props} callback={getTheUser}/>}/>

        <Route
            path='/signup-local'
            render={(props) => <SignUpLocal {...props} callback={getTheUser}/>}/>
        <ProtectedRoute
          user={state.loggedInUser}
          callback={getTheUser}
          path='/profile'
          component={Profile}/>
        
        <ProtectedRoute
          user={state.loggedInUser}
          callback={getTheUser}
          path='/property/create-property'
          component={CreateProperty}/>
        <Route
            path='/create-property'
            render={(props) => <CreateProperty {...props} callback={getTheUser}/>}/>
            
        <Route
          exact
          path='/logout'
          render={(props) => <Logout {...props} callback={getTheUser}/>}/>
        {/* 

            <Route path="/signup" render={(props) => <Signup {...props} callback={this.getTheUser} />} />

            <Route path="/projects/:id" render={(props) => <ProjectDetails {...props} />} />

             CON LA KEY SE VUELVE A CARGAR TODO CADA VEZ QUE SE MODIFICA ALGO
            <Route exact path="/projects" render={(props) => <ProjectList {...props} user={this.state.loggedInUser} key={this.state.loggedInUser}/>} />

            <ProtectedRoute
              path="/profile"
              user={this.state.loggedInUser}
              component={Profile}
              /> 
            <Route exact path="/fileupload">
              <Componente/>
            </Route>
            */}
      </Switch>
    </div>
  );
}

export default App;
