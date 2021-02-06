import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import SearchService from '../services/search/search-service'
import PropertyService from '../services/property/property-service'
import { FieldArray, useFormik } from 'formik'
import * as Yup from 'yup'
import InputFormik from '../components/forms/InputFormik'
import useAuth from '../hooks/useAuth'
import MainService from '../services/service'
import { ButtonKokomo } from '../styles/buttons'
import CheckboxFormik from '../components/forms/CheckboxFormik'
import { Formik, Field, Form } from 'formik'

const search = new SearchService()

function CreateProperty() {
   let history = useHistory()
   const { auth } = useAuth()

   const { handleChange, handleSubmit, errors, values, setValues } = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (values) => {
         try {
            const property = await MainService.postData('/property/new', {
               ...values,
               owner: auth._id
            })
            history.push(`/property/${property._id}`)
         } catch (error) {
            console.error(error)
         }
      }
   })

   /*
   const handleFile = (e) => {
      e.preventDefault()
      const uploadData = new FormData()
      uploadData.append('mainImage', e.target.files[0])
      propertyService.uploadPicture(uploadData).then((response) => {
         setState({ ...state, mainImage: response.path })
      })
   }

   const handleGoogleSearch = (e) => {
      e.preventDefault()
      search.searchLocation(state.search).then((response) => {
         setState({
            ...state,
            search: response.candidates[0].name,
            location: {
               lat: response.candidates[0].geometry.location.lat,
               long: response.candidates[0].geometry.location.lng,
               name: response.candidates[0].formatted_address
            }
         })
      })
   }

   */

   return (
      <div className="container mt-4">
         <Link to="/">
            <div>
               <span className="fa-stack fa-2x kokomo-back-button">
                  <i className="fas fa-circle fa-stack-2x circle-back"></i>
                  <i className="fas fa-arrow-left fa-stack-1x fa-inverse arrow-back"></i>
               </span>
            </div>
         </Link>
         <div className="hero">
            <h2 className="hero-title text-center mb-4">Crea tu local</h2>
         </div>
         <Formik
            initialValues={{
               toggle: false,
               checked: []
            }}
            initialValues={initialValues()}
            validationSchema={Yup.object(validationSchema())}
            onSubmit={async (values) => {
               try {
                  const property = await MainService.postData('/property/new', {
                     ...values,
                     owner: auth._id
                  })
                  history.push(`/property/${property._id}`)
               } catch (error) {
                  console.error(error)
               }
            }}
         >
            {({ values, handleSubmit, handleChange, errors }) => (
               <form onSubmit={handleSubmit}>
                  <div className="row">
                     <div className="col-md-6">
                        <InputFormik
                           label="Nombre"
                           name="name"
                           handleChange={handleChange}
                           errors={errors.name}
                        />
                     </div>
                     <div className="col-md-6">
                        <InputFormik
                           label="Descripción"
                           name="description"
                           handleChange={handleChange}
                           errors={errors.description}
                        />
                     </div>
                     <div className="col-md-6">
                        <p className="label active mb-2">Categorías</p>
                        <div className="d-flex">
                           <CheckboxFormik
                              name="categories"
                              value="Surfer"
                              type="checkbox"
                           />
                           <CheckboxFormik
                              name="categories"
                              value="Restaurant"
                              type="checkbox"
                           />
                           <CheckboxFormik
                              name="categories"
                              value="Chillout"
                              type="checkbox"
                           />
                           <CheckboxFormik
                              name="categories"
                              value="Bar"
                              type="checkbox"
                           />
                           <CheckboxFormik
                              name="categories"
                              value="Disco"
                              type="checkbox"
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <InputFormik
                           label="Número de plazas disponibles por franja horaria"
                           name="availablePlaces"
                           handleChange={handleChange}
                           errors={errors.availablePlaces}
                        />
                     </div>
                     <div className="col-md-6">
                        <p className="label active mb-2">Días de apertura</p>
                        <CheckboxFormik
                           name="weekDays"
                           value="1"
                           label="Lunes"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           value="2"
                           label="Martes"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           value="3"
                           label="Miércoles"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           label="Jueves"
                           value="4"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           label="Viernes"
                           value="5"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           label="Sábado"
                           value="6"
                           type="checkbox"
                        />
                        <CheckboxFormik
                           name="weekDays"
                           label="Domingo"
                           value="0"
                           type="checkbox"
                        />
                     </div>
                     <div className="col-md-12">
                        <FieldArray name="timeRanges">
                           {({ insert, remove, push }) => (
                              <div>
                                 {values.timeRanges.length > 0 &&
                                    values.timeRanges.map((friend, index) => (
                                       <div className="row" key={index}>
                                          <div className="col">
                                             <InputFormik
                                                label="Inicio"
                                                name={`timeRanges.${index}.start`}
                                                handleChange={handleChange}
                                             />
                                          </div>
                                          <div className="col">
                                             <InputFormik
                                                label="Fin"
                                                name={`timeRanges.${index}.end`}
                                                handleChange={handleChange}
                                             />
                                          </div>
                                          <div className="col">
                                             <ButtonKokomo
                                                danger
                                                type="button"
                                                onClick={() => remove(index)}
                                             >
                                                <i className="mdi mdi-close"></i>
                                             </ButtonKokomo>
                                          </div>
                                       </div>
                                    ))}
                                 <ButtonKokomo
                                    success
                                    type="button"
                                    onClick={() => push({ start: '', end: '' })}
                                 >
                                    Nueva franja horaria
                                 </ButtonKokomo>
                              </div>
                           )}
                        </FieldArray>
                     </div>
                     <div className="row mt-5">
                        <ButtonKokomo success type="submit">
                           Crear
                        </ButtonKokomo>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </div>
   )
}

export default CreateProperty

const initialValues = () => {
   return {
      name: '',
      description: '',
      categories: [],
      availablePlaces: '',
      weekDays: [],
      timeRanges: [
         {
            start: '',
            end: ''
         }
      ]
   }
}

const validationSchema = () => {
   return {
      name: Yup.string().required(),
      description: Yup.string().required()
   }
}
