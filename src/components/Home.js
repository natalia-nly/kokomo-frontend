import React from "react";
import CarouselProperties from "./properties/CarouselProperties";
import Categories from "./properties/Categories";

const Home = () => {
  return (
    <div>
      <div className="home-container" style={{ paddingBottom: "80px" }}>
        <div className="hero">
          <h2 className="hero-title">Inicio</h2>
        </div>

        <Categories />

        <div className="">
          <h2 className="title-search-home">Nuestros chiringuitos</h2>
          <CarouselProperties filter="All" />

          <h2 className="title-search-home mt-4">Estilo chillout</h2>
          <CarouselProperties filter="Chillout" />

          <h2 className="title-search-home mt-4">Los mejores restaurantes</h2>
          <CarouselProperties filter="Restaurante" />
        </div>
      </div>
    </div>
  );
};

export default Home;
