import React, { useState } from 'react'
import MainService from '../services/service'
import { useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SignUp = () => {
   const [form, setForm] = useState({
      username: '',
      email: '',
      telNumber: '',
      password: ''
   })
   const history = useHistory()
   const { login } = useAuth()

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const user = await MainService.postData('/auth/signup', form)
         login(user)
         history.push('/')
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value })

   return (
      <div className="container-fluid">
         <div className="row align-middle vh-100 justify-content-center p-4">
            <div className="col-sm-12 col-md-4 align-self-center">
               <h2 className="hero-title text-center mb-4">Crea tu cuenta</h2>
               <form onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label htmlFor="username" className="label active">
                        Nombre de usuario
                     </label>
                     <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="telNumber" className="label active">
                        Número de teléfono
                     </label>
                     <input
                        type="number"
                        name="telNumber"
                        value={form.telNumber}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email" className="label active">
                        Email
                     </label>
                     <input
                        type="email"
                        name="email"
                        value={form.email}
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
                     Registrarme
                  </button>
               </form>
               <a
                  href={process.env.REACT_APP_API_URL + '/auth/google'}
                  className="btn-kokomo btn-kokomo-google btn-block p-3 mt-4"
               >
                  <img
                     src="/images/google.svg"
                     alt="Google logo"
                     style={{ width: '20px', marginRight: '8px' }}
                  />{' '}
                  Registrarme con Google
               </a>
            </div>
         </div>
      </div>
   )
}

export default SignUp
