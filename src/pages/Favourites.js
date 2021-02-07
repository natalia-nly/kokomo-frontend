import React from 'react'
import CarouselProperties from '../components/properties/CarouselProperties'
import { SectionTitleStyle } from '../styles/titles'

const Favourites = () => {
  return (
    <div className="container mt-5">
      <SectionTitleStyle center>Tus favoritos</SectionTitleStyle>
      <CarouselProperties filter="Favourites" />
    </div>
  )
}

export default Favourites
