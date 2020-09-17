import {Route, Redirect} from 'react-router-dom'
import React from 'react'


// Retrieve your data from locaStorage
let saveData = JSON.parse(localStorage.saveData || null) || {};


function loadStuff() {
    return saveData.obj;
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
                } else if(loadStuff()!== (null||undefined)){
                    return <Component {...props} loggedInUser={loadStuff()} callback={callback}/>
                }
                else {
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
