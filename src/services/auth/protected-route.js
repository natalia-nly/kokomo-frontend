import { Route, useHistory } from 'react-router-dom'
import React from 'react'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = ({ component: Component, user, callback, ...rest }) => {
   const { auth } = useAuth()
   const history = useHistory()

   return (
      <Route
         {...rest}
         render={(props) => {
            if (auth === undefined) return history.push('/login')

            return (
               <Component {...props} />
            )
         }}
      />
   )
}

export default ProtectedRoute
