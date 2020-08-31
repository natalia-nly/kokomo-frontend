import {Route, Redirect} from 'react-router-dom'
import React, {useEffect} from 'react'
import AuthService from './auth-service';

// Retrieve your data from locaStorage
var saveData = JSON.parse(localStorage.saveData || null) || {};
const service = new AuthService()

// Store your data.
function saveStuff(obj) {
    saveData.obj = obj;
    localStorage.saveData = JSON.stringify(saveData);
}

function loadStuff() {
    return saveData.obj || "default";
}

const ProtectedRoute = ({
    component: Component,
    user,
    callback,
    ...rest
}) => {

            return (
            <Route
                {...rest}
                render={props => {
                if (user) {
                    console.log('user2',user)
                    return <Component {...props} loggedInUser={user} callback={callback}/>
                } else{
                    return <Redirect
                        to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }}/>
    )
    }
   

export default ProtectedRoute;
