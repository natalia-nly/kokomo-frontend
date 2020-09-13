import React from 'react'
import CarouselProperties from "./properties/CarouselProperties";

const Favourites = () => {
    return (
        <div>
            <div className="body-container">

                <h3 className="section-title mt-4">
                    <i className="fas fa-heart fa-sm"></i>
                    Tus favoritos</h3>

                    <CarouselProperties filter="Favourites"/>
            </div>
        </div>
    )
}

export default Favourites