import React from 'react'
import CarouselProperties from '../components/properties/CarouselProperties'

const PropertyCategory = (props) => {
   return (
      <div>
         <div>
            <h3 className="section-title mt-4 text-center">
               {props.match.params.name}
            </h3>
            <CarouselProperties filter={props.match.params.name} />
         </div>
      </div>
   )
}

export default PropertyCategory
