import React from 'react'
import CarouselProperties from "./properties/CarouselProperties";

const Favourites = () => {
    return (
        <div>
            <div class="body-container">

                <h3 class="section-title mt-4">
                    <i class="fas fa-heart fa-sm"></i>
                    Tus favoritos</h3>

                    <CarouselProperties/>

                <p>Todavía no tienes favoritos</p>

            </div>
        </div>
    )
}

export default Favourites