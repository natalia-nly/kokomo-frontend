import React from 'react'
import CarouselProperties from '../components/properties/CarouselProperties'
import Categories from '../components/properties/Categories'
import { SectionSubtitleStyle } from '../styles/titles'
import useAuth from '../hooks/useAuth'
import LandingPage from './LandingPage'

const Home = () => {
   const { auth } = useAuth()
   if (auth === undefined) return <LandingPage />

   return (
      <div>
         <div className="home-container" style={{ paddingBottom: '80px' }}>
            <div className="hero">
               <h2 className="hero-title">Inicio</h2>
            </div>

            <Categories />

            <div className="">
               <SectionSubtitleStyle>
                  Nuestros chiringuitos
               </SectionSubtitleStyle>
               

               <CarouselProperties filter="All" />

               <SectionSubtitleStyle>Estilo chillout</SectionSubtitleStyle>
               <CarouselProperties filter="Chillout" />

               <SectionSubtitleStyle>
                  Los mejores restaurantes
               </SectionSubtitleStyle>
               <CarouselProperties filter="Restaurante" />
            </div>
         </div>
      </div>
   )
}

export default Home
