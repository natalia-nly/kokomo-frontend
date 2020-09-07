import React from "react";
import CarouselProperties from "./properties/CarouselProperties";

const Home = () => {
  return (
    <div>
      <div className="home-container" style={{ "paddingBottom": "80px" }}>
        <div className="hero">
          <h2 className="hero-title">Inicio</h2>

          <br />
        </div>
        <div className="category-group">
          <div className="one-category">
            <a href="/category/Surfer">
              <div className="img-container">
                <img src="/images/surf.png" alt="Surfer" />
              </div>
              <p>Surfer</p>
            </a>
          </div>
          <div className="one-category">
            <a href="/category/Chillout">
              <div className="img-container">
                <img src="/images/chillout.png" alt="Chillout" />
              </div>
              <p>Chillout</p>
            </a>
          </div>
          <div className="one-category">
            <a href="/category/Discoteca">
              <div className="img-container">
                <img src="/images/disco.png" alt="Disco" />
              </div>
              <p>Disco</p>
            </a>
          </div>
          <div className="one-category">
            <a href="/category/Bar">
              <div className="img-container">
                <img src="/images/bar.png" alt="Bar" />
              </div>
              <p>Bar</p>
            </a>
          </div>
          <div className="one-category">
            <a href="/category/Restaurante">
              <div className="img-container">
                <img src="/images/restaurant.png" alt="Bar" />
              </div>
              <p>Restaurant</p>
            </a>
          </div>
        </div>

        <div className="">
          <h2 className="title-search-home">Nuestros chiringuitos</h2>
          <CarouselProperties />

          <h2 className="title-search-home mt-4">Estilo chillout</h2>
          <CarouselProperties />

          <h2 className="title-search-home mt-4">Los mejores restaurantes</h2>
          <CarouselProperties />
        </div>
      </div>
    </div>
  );
};

export default Home;
