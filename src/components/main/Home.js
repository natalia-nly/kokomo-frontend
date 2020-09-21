import React from "react";
import CarouselProperties from "../properties/CarouselProperties";
import Categories from "../properties/Categories";
import { SectionSubtitleStyle } from "../styled-components/titles";

const Home = () => {
  return (
    <div>
      <div className="home-container" style={{ paddingBottom: "80px" }}>
        <div className="hero">
          <h2 className="hero-title">Inicio</h2>
        </div>

        <Categories />

        <div className="">
          <SectionSubtitleStyle>Nuestros chiringuitos</SectionSubtitleStyle>
          <CarouselProperties filter="All" />

          <SectionSubtitleStyle>Estilo chillout</SectionSubtitleStyle>
          <CarouselProperties filter="Chillout" />

          <SectionSubtitleStyle>Los mejores restaurantes</SectionSubtitleStyle>
          <CarouselProperties filter="Restaurante" />
        </div>
      </div>
    </div>
  );
};

export default Home;