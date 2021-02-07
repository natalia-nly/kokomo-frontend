import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/main/Loader'
import BookingService from '../services/booking/booking-service'

const service = new BookingService()

const BookingDetails = (props) => {
   const [state, setState] = useState({})
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      service.bookingDetails(props.match.params.bookingId).then((booking) => {
         setState(booking)
         setLoading(false)
      })
   }, [props.match.params.bookingId])

   if (loading) return <Loader />

   return (
      <>
         <div
            className="container text-center d-flex align-items-center justify-content-center"
            style={{ height: '90vh' }}
         >
            <div>
               <img
                  src="/images/3.png"
                  className="emoji-img"
                  alt="Reserva creada"
               />

               <h2 className="subtitle-landing text-center mb-3">
                  ¡Reserva creada con éxito!
               </h2>
               <p>
                  <i className="far fa-calendar-alt"></i> Día:{' '}
                  {state.booking.day}
               </p>
               <p>
                  <i className="far fa-clock"></i> Hora: {state.booking.time}
               </p>
               <p>
                  <i className="fas fa-users"></i> Número de personas:{' '}
                  {state.booking.guests}
               </p>
               <p>
                  <i className="fas fa-users"></i> A nombre de:{' '}
                  {state.booking.customer.username}
               </p>

               <a
                  href={
                     'whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-react.herokuapp.com/booking/details/' +
                     state.booking._id
                  }
                  className="btn-kokomo btn-kokomo-grey mt-4 p-3 mr-4"
               >
                  Compartir reserva por WhatsApp
               </a>
               <Link to="/" className="btn-kokomo btn-kokomo-grey mt-4 p-3">
                  Volver a inicio
               </Link>
            </div>
         </div>
      </>
   )
}

export default BookingDetails
