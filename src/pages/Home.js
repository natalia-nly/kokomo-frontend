import React, { useEffect, useState } from 'react'
import CarouselProperties from '../components/properties/CarouselProperties'
import Categories from '../components/properties/Categories'
import { SectionSubtitleStyle } from '../styles/titles'
import useAuth from '../hooks/useAuth'
import LandingPage from './LandingPage'
import MainService from '../services/service'
import Loader from '../components/main/Loader'

const Home = () => {
  const { auth } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const properties = await MainService.getData('/property/')
    setProperties(properties)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (auth === undefined) return <LandingPage properties={properties} />
  if (loading) return <Loader />

  return (
    <div>
      <div className="container mt-5">
        <div className="hero">
          <h2 className="hero-title">Inicio</h2>
        </div>

        <Categories />

        <SectionSubtitleStyle>Nuestros chiringuitos</SectionSubtitleStyle>
        <CarouselProperties properties={properties} />
      </div>
    </div>
  )
}

export default Home
