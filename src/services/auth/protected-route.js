import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import Loader from '../../components/main/Loader'

const ProtectedRoute = ({ component, ...options }) => {
   const { auth, loading } = useAuth()
   if(loading) return <Loader/>
   if (!auth) return <Redirect to="/login" />

   return <Route {...options} component={component} />
}

export default ProtectedRoute
