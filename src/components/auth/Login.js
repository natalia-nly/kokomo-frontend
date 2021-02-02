import React, { useState } from 'react'
import MainService from '../../services/service'
import { Redirect, useHistory } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Login = () => {
   const [form, setForm] = useState({ user: '', password: '' })
   const history = useHistory()
   const { login, auth } = useAuth()

   if (auth !== undefined) return <Redirect to="/profile" />

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const user = await MainService.postData('/login', form)
         login(user)
         history.push('/')
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value })

   return (
      <div>
         <div
            className="row align-middle  justify-content-center p-4"
            style={{ minHeight: '100vh' }}
         >
            <div className="col-sm-12 col-md-4 align-self-center">
               <h2 className="hero-title text-center mb-4">Iniciar sesión</h2>
               <form onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label htmlFor="user" className="label active">
                        Nombre de usuario
                     </label>
                     <input
                        type="text"
                        name="user"
                        value={form.user}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="password" className="label active">
                        Contraseña
                     </label>
                     <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                     />
                  </div>

                  <button
                     type="submit"
                     className="btn-kokomo btn-kokomo-success btn-block p-3"
                  >
                     Iniciar sesión
                  </button>
               </form>

               <a
                  href={process.env.REACT_APP_API_URL + '/auth/google'}
                  className="btn-kokomo btn-kokomo-google btn-block p-3 mt-4"
               >
                  {' '}
                  <img
                     src="/images/google.svg"
                     alt="Google logo"
                     style={{ width: 20, marginRight: 8 }}
                  />{' '}
                  Iniciar sesión con Google
               </a>
            </div>
         </div>
      </div>
   )
}

export default Login
