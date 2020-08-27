import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <div>
    <Navbar/>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

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
