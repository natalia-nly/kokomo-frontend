import React from 'react'
import { createContext, useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import MainService from '../services/service'

const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const history = useHistory()
  const [auth, setAuth] = useState(undefined)
  const [realoadUser, setReloadUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('kokomo_user')
    if (user) {
      MainService.getData(`/auth/${user}`).then((user) => setAuth(user))
    } else {
      setAuth(undefined)
    }
    setReloadUser(false)
    setLoading(false)
  }, [realoadUser])

  const login = (user) => {
    localStorage.setItem('kokomo_user', user._id)
    setAuth(user)
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('kokomo_user')
    history.push('/')
    setAuth(undefined)
    setLoading(false)
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      loading,
      setReloadUser
    }),
    [auth, loading]
  )

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
