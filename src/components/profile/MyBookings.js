import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Booking from './Booking'
import OwnerLocal from './OwnerLocal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import BookingService from '../../services/booking/booking-service'
import { SectionTitleStyle } from '../styled-components/titles'
import useAuth from '../../hooks/useAuth'

const bookingService = new BookingService()
let reservas = <p>Todavía no tienes reservas</p>
let reservasProperties = <p>Todavía no tienes reservas</p>
let active = 'client'
let ownerTab = <></>

const initialState = {
   bookings: [],
   properties: [],
   user: {}
}

const MyBookings = (props) => {
   const { auth } = useAuth()
   const [state, setState] = useState(initialState)

   useEffect(() => {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      if (auth.owner) {
         active = 'owner'
      }
      setState((state) => ({ ...state, user: auth }))
      const loadData = () => {
         try {
            bookingService.myBookings().then((response) => {
               setState((state) => ({
                  ...state,
                  bookings: response.bookings
               }))
            })
         } catch (error) {
            if (axios.isCancel(error)) {
               console.log('cancelled')
            } else {
               throw error
            }
         }
      }
      loadData()
      return () => {
         source.cancel()
      }
   }, [])

   useEffect(() => {
      bookingService.propertiesBookings().then((response) => {
         setState((state) => ({
            ...state,
            properties: response.ownProperties
         }))
      })
   }, [])

   const refreshPage = () => {
      window.location.reload(false)
   }


   const deleteBooking = (bookingId) => {
      bookingService.deleteBooking(bookingId).then((response) => {
         refreshPage()
      })
   }

   if (state.bookings.length) {
      reservas = state.bookings.map((booking, index) => (
         <Booking key={index} booking={booking} delete={deleteBooking} />
      ))
   }

   if (state.user.owner) {
      if (state.properties.length) {
         reservasProperties = state.properties.map((property, index) => (
            <OwnerLocal
               key={index}
               property={property}
               delete={deleteBooking}
            />
         ))
         ownerTab = (
            <Tab
               eventKey="owner"
               title="Reservas en tus Locales"
               className="nav-item nav-link"
            >
               <div>
                  <div
                     className="tab-pane fade show active"
                     id="nav-next-bookings"
                     role="tabpanel"
                     aria-labelledby="nav-next-bookings-tab"
                  >
                     <div className="group-booking">{reservasProperties}</div>
                  </div>
               </div>
            </Tab>
         )
      }
   }

   return (
      <div className="body-container">
         <SectionTitleStyle>
            <i className="mdi mdi-calendar"></i> Gestión de reservas
         </SectionTitleStyle>

         <Tabs defaultActiveKey={active} id="nav-tab" className="nav nav-tabs">
            {ownerTab}
            <Tab
               eventKey="client"
               title="Tus reservas"
               className="nav-item nav-link"
            >
               <div>
                  <div
                     className="tab-pane fade show active"
                     id="nav-next-bookings"
                     role="tabpanel"
                     aria-labelledby="nav-next-bookings-tab"
                  >
                     <div className="group-booking">{reservas}</div>
                  </div>
               </div>
            </Tab>
         </Tabs>
      </div>
   )
}

export default MyBookings
