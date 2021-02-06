import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AvailableTimes from '../components/properties/AvailableTimes'
import DetailedMap from '../components/search/DetailedMap'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ActualRating from '../components/properties/ActualRating'
import AddRating from '../components/properties/AddRating'
import PropertyService from '../services/property/property-service'
import SearchService from '../services/search/search-service'
import useAuth from '../hooks/useAuth'
import Loader from '../components/main/Loader'
import MainService from '../services/service'

const propertyService = new PropertyService()
const searchService = new SearchService()

const PropertyDetails = (props) => {
   const { auth } = useAuth()

   const [state, setState] = useState({})
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      MainService.getData(`/property/${props.match.params.propertyId}`).then(
         (response) => {
            let counter = response.rating?.counter || [0]
            let reduceFunc = (a, b) => a + b

            let rateNumber = parseFloat(
               (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
            )

            setState((state) => ({
               ...state,
               property: response,
               actualRating: rateNumber
            }))
            setLoading(false)
         }
      )
   }, [props])

   console.log('state.property: ', state.property)

   if (loading) return <Loader />

   const handleChangeRating = (newValue) => {
      setState({
         ...state,
         ratingComment: newValue
      })
   }

   const handleChange = (event) => {
      setState({
         ...state,
         [event.target.name]: event.target.value
      })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const body = {
         bookingDate: state.bookingDate,
         numberGuests: state.numberGuests
      }
      searchService
         .getPropertyAvailability(state.property._id, body)
         .then((response) => {
            setState({
               ...state,
               availableResults: response,
               showFormMobile: false
            })
         })
   }

   const handleFavourite = () => {
      propertyService.propertyLove(state.property._id).then((response) => {
         const newFavs = [...state.favourites]
         newFavs.push(state.property._id)

         setState({
            ...state,
            favourites: newFavs
         })
      })
   }

   const handleComment = (e) => {
      e.preventDefault()
      let body = {
         username: auth.username,
         comment: state.comment,
         avatar: auth.avatar,
         rating: state.ratingComment
      }
      propertyService.addComment(state.property._id, body).then((response) => {
         let counter = response.rating.counter
         let reduceFunc = (a, b) => a + b

         let rateNumber = parseFloat(
            (counter.reduce(reduceFunc, 0) / counter.length).toFixed(2)
         )

         setState({
            ...state,
            property: response,
            comment: '',
            actualRating: rateNumber
         })
      })
   }

   let heartKokomo = 'far fa-heart fa-stack-1x fa-inverse'
   if (state.favourites && state.favourites.includes(state.property._id)) {
      heartKokomo = 'fas fa-heart fa-stack-1x fa-inverse'
   }

   let availableTimes = <></>

   const clearAvailableTimes = () => {
      setState({ ...state, availableResults: [] })
   }

   if (state.availableResults?.length) {
      availableTimes = (
         <AvailableTimes
            guests={state.numberGuests}
            results={state.availableResults}
            clearAvailableTimes={clearAvailableTimes}
         />
      )
   }

   let allComments = state.property.comments?.map((comment, index) => (
      <div className="comment-kokomo pb-4 pt-4" key={index}>
         <h5>
            <img
               src={comment.avatar}
               alt="Avatar"
               style={{
                  width: '30px',
                  borderRadius: '100px',
                  marginRight: '10px'
               }}
            />{' '}
            {comment.username}
         </h5>
         <p>{comment.comment}</p>
      </div>
   ))

   let showProperty = (
      <>
         <div className="row d-flex align-items-center justify-content-center">
            <div className=" flotante-kokomo">
               <div className="row w-100 align-items-center">
                  <p className="text-white">
                     Necesitas una cuenta para poder hacer reservas.
                  </p>
                  <Link
                     to="/signup"
                     className="btn kokomo-btn-form"
                     style={{ width: '35%' }}
                  >
                     Regístrate ahora
                  </Link>
               </div>
            </div>
            <Link to="/signup" className="btn btn-floating">
               Regístrate ahora
            </Link>
         </div>
      </>
   )

   let addComment = <></>

   if (auth !== undefined) {
      addComment = (
         <>
            <AddRating
               handleChangeRating={handleChangeRating}
               ratingComment={state.ratingComment}
            />
            <form onSubmit={handleComment} className="d-flex mt-2">
               <div
                  className="form-group"
                  style={{
                     width: '70%'
                  }}
               >
                  <label htmlFor="comment" className="label active">
                     Deja tu comentario
                  </label>
                  <input
                     type="text"
                     name="comment"
                     value={state.comment}
                     onChange={handleChange}
                  />
               </div>
               <div
                  style={{
                     width: '30%'
                  }}
               >
                  <button
                     type="submit"
                     value={<i className="fas fa-ellipsis-v"></i>}
                     className="btn-kokomo-flex"
                     style={{
                        padding: '19px'
                     }}
                  >
                     <i className="fas fa-paper-plane"></i>
                  </button>
               </div>
            </form>{' '}
         </>
      )

      showProperty = (
         <>
            <div className="row d-flex align-items-center justify-content-center">
               <form
                  className="form-row flotante-kokomo"
                  onSubmit={handleSubmit}
               >
                  <div className="row w-100">
                     <div className="col-40">
                        <div className="form-group">
                           <label
                              htmlFor="bookingDate"
                              className="label active"
                           >
                              ¿Qué día quieres venir?
                           </label>
                           <input
                              type="date"
                              name="bookingDate"
                              onChange={handleChange}
                              value={state.bookingDate}
                              data-date-format="DD MMMM YYYY"
                           />
                        </div>
                     </div>
                     <div className="col-40">
                        <div className="form-group">
                           <label
                              htmlFor="numberGuests"
                              className="label active"
                           >
                              ¿Cuántos seréis?
                           </label>
                           <input
                              type="number"
                              name="numberGuests"
                              min="1"
                              onChange={handleChange}
                              value={state.numberGuests}
                              className="kokomo-input"
                           />
                        </div>
                     </div>
                     <div className="col-20">
                        <button type="submit" className="kokomo-btn-form">
                           <SearchIcon />
                        </button>
                     </div>
                  </div>
               </form>
               <button onClick={() => showForm()} className="btn-floating">
                  Hacer una reserva
               </button>
            </div>
         </>
      )
   }

   let ratingProperty = <></>
   if (state.actualRating) {
      ratingProperty = (
         <ActualRating
            rate={state.actualRating}
            numberReviews={state.property.rating.counter.length}
         />
      )
   }

   let showMobileForm = <></>

   let showForm = () => {
      setState({ ...state, showFormMobile: true })
   }

   let hideForm = () => {
      setState({ ...state, showFormMobile: false })
   }

   if (state.showFormMobile) {
      showMobileForm = (
         <>
            <div className="text-center d-flex align-items-center justify-content-center kokomo-popup">
               <div className="row align-middle justify-content-center w-100">
                  <div className="col-md-4 align-self-center fondo-kokomo">
                     <img
                        src="/images/calendar.png"
                        className="emoji-img"
                        alt="Horas disponibles"
                     />
                     <button onClick={hideForm} className="close-btn">
                        <i className="fas fa-times"></i>
                     </button>
                     <form onSubmit={handleSubmit}>
                        <div className="form-group">
                           <label
                              htmlFor="bookingDate"
                              className="label active"
                           >
                              ¿Qué día quieres venir?
                           </label>
                           <input
                              type="date"
                              name="bookingDate"
                              onChange={handleChange}
                              value={state.bookingDate}
                              data-date-format="DD MMMM YYYY"
                           />
                        </div>
                        <div className="form-group">
                           <label
                              htmlFor="numberGuests"
                              className="label active"
                           >
                              ¿Cuántos seréis?
                           </label>
                           <input
                              type="number"
                              name="numberGuests"
                              min="1"
                              onChange={handleChange}
                              value={state.numberGuests}
                              className="kokomo-input"
                           />
                        </div>
                        <button type="submit" className="kokomo-btn-form">
                           <SearchIcon />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </>
      )
   }

   return (
      <>
         {showMobileForm}
         <div style={{ backgroundColor: '#fbf7f3', height: '100vh' }}>
            <Link to="/">
               <div>
                  <span className="fa-stack fa-2x kokomo-back-button">
                     <i className="fas fa-circle fa-stack-2x circle-back"></i>
                     <i className="fas fa-arrow-left fa-stack-1x fa-inverse arrow-back"></i>
                  </span>
               </div>
            </Link>
            <div
               className="home-bg image-background"
               style={{
                  backgroundImage: `url(${state.property.mainImage})`
               }}
            >
               <div className="container-left"></div>

               <div className="white-card">
                  <div className="title-heart">
                     <div>
                        <a onClick={handleFavourite}>
                           <span className="fa-stack fa-2x mr-4">
                              <i className="fas fa-circle fa-stack-2x orange"></i>
                              <i className={heartKokomo}></i>
                           </span>
                        </a>
                     </div>
                     <div>
                        <h2 className="title-search">{state.property.name}</h2>
                        {ratingProperty}
                     </div>
                  </div>
                  <Tabs
                     defaultActiveKey="nav-description"
                     id="nav-tab"
                     className="nav nav-tabs nav-fill tab-details"
                  >
                     <Tab
                        eventKey="nav-description"
                        title="Info"
                        className="nav-item nav-link"
                     >
                        <div className="row">
                           <div className="col-md-6">
                              <h3 className="subtitle-search mb-4">
                                 {state.property.description}
                              </h3>
                              <p>
                                 Plazas disponibles:{' '}
                                 {state.property.availablePlaces}
                              </p>
                              <p>
                                 <i className="fas fa-map-marker-alt"></i>{' '}
                                 Dirección: {state.property.location?.name}
                              </p>
                           </div>
                           <div className="col-md-6">
                              {/*
                              <DetailedMap
                                 lat={state.property.location.lat}
                                 lng={state.property.location.long}
                                 property={state.property}
                              />
                              */}
                           </div>
                        </div>
                     </Tab>
                     <Tab
                        eventKey="nav-comments"
                        title="Reseñas"
                        className="nav-item nav-link"
                     >
                        <div className="row">
                           <div className="col-md-6">{addComment}</div>
                           <div className="col-md-6">{allComments}</div>
                        </div>
                     </Tab>
                     <Tab
                        eventKey="nav-openings"
                        title="Horarios"
                        className="nav-item nav-link"
                     >
                        <div className="row">
                           <div className="col-md-6"></div>
                           <div className="col-md-6"></div>
                        </div>
                     </Tab>
                  </Tabs>
                  {showProperty}
               </div>
            </div>
            {availableTimes}
         </div>
      </>
   )
}

export default PropertyDetails
