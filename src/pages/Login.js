import React from 'react'
import MainService from '../services/service'
import { Redirect, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputFormik from '../components/forms/InputFormik'
import { ButtonKokomoBlock } from '../styles/buttons'

const Login = () => {
  const history = useHistory()
  const { login, auth } = useAuth()

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      try {
        const user = await MainService.postData('/auth/login', values)
        login(user)
        history.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  })

  if (auth !== undefined) return <Redirect to="/profile" />

  return (
    <div className="container-fluid">
      <div className="row align-middle justify-content-center vh-100">
        <div className="col-sm-12 col-md-4 align-self-center">
          <h2 className="hero-title text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <InputFormik
              label="Email"
              name="email"
              handleChange={handleChange}
              errors={errors.email}
            />
            <InputFormik
              label="Contraseña"
              name="password"
              type="password"
              handleChange={handleChange}
              errors={errors.password}
            />
            <ButtonKokomoBlock success>Iniciar sesión</ButtonKokomoBlock>
          </form>

          <a
            href={process.env.REACT_APP_API_URL + '/auth/google'}
            className="btn-kokomo btn-kokomo-google btn-block p-3 mt-4"
          >
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

const initialValues = () => {
  return {
    email: '',
    password: ''
  }
}

const validationSchema = () => {
  return {
    email: Yup.string()
      .email('Introduce un email válido')
      .required('Por favor, introduce tu email'),
    password: Yup.string()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        'La contraseña debe tener al menos 6 caracteres y debe contener, por lo menos, una letra minúscula, una mayúscula y un número.'
      )
      .required('Por favor, introduce tu contraseña')
  }
}
