import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
     <h1>Kokomo</h1>
     <Switch>
            <Route exact path="/">
              <h1>Esta es la homepage</h1>
            </Route>

            {/* 
              CON LA KEY SE VUELVE A CARGAR TODO CADA VEZ QUE SE MODIFICA ALGO
            <Route exact path="/projects" render={(props) => <ProjectList {...props} user={this.state.loggedInUser} key={this.state.loggedInUser}/>} /> */}

            {/* <Route path="/projects/:id" render={(props) => <ProjectDetails {...props} />} /> */}
            <Route exact path="/fileupload">
              {/* componente */}
            </Route>
            <Route path="/signup" render={(props) => <Signup {...props} callback={this.getTheUser} />} />
            <Route path="/login" render={(props) => <Login {...props} callback={this.getTheUser} />} />
            <Route path="/logout" render={(props) => <Logout {...props} callback={this.getTheUser} />} />
            <ProtectedRoute
              path="/profile"
              user={this.state.loggedInUser}
              component={Profile}
              />
        </Switch>
    </div>
  );
}

export default App;
