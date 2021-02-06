import React from 'react'
import CarouselProperties from '../components/properties/CarouselProperties'
import { SectionTitleStyle } from '../styles/titles'

const Favourites = () => {
   return (
      <div>
         <div className="body-container">
            <SectionTitleStyle center>Tus favoritos</SectionTitleStyle>
            <CarouselProperties filter="Favourites" />
         </div>
      </div>
   )
}

export default Favourites
