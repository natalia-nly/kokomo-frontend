import React from 'react'
import PropertyService from '../../services/property/property-service'
import ActualRatingCarousel from './ActualRatingCarousel'
import { CarouselPropStyles } from '../../styles/PropertiesStyles'
import PropertyCard from './PropertyCard'

const CarouselProperties = ({ properties }) => {
  const array = properties?.map((property) => (
    <div key={property._id} className="col-md-4">
      <PropertyCard property={property} />
    </div>
  ))
  return properties?.length ? (
    <div className="row">{array}</div>
  ) : (
    'no hay locales'
  )
}

export default CarouselProperties
