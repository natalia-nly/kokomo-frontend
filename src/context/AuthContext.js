import React from 'react'
import { createContext, useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
   const history = useHistory()
   const [auth, setAuth] = useState(undefined)
   const [realoadUser, setReloadUser] = useState(false)

   useEffect(() => {
      const user = localStorage.getItem('kokomo_user')
      if (user) {
         setAuth(JSON.parse(user))
      } else {
         setAuth(undefined)
      }
      setReloadUser(false)
   }, [realoadUser])

   const login = (user) => {
      localStorage.setItem('kokomo_user', JSON.stringify(user))
      setAuth(user)
   }

   const logout = () => {
      if (auth) {
         localStorage.removeItem('kokomo_user')
         setAuth(null)
         history.push('/')
      }
   }

   const authData = useMemo(
      () => ({
         auth,
         login,
         logout,
         setReloadUser
      }),
      [auth]
   )

   return (
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
   )
}

export default AuthContext
