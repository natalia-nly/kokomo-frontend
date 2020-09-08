import React from "react";
import CarouselProperties from "./properties/CarouselProperties";
import axios from "axios";
import GeneralMap from "./search/GeneralMap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  console.log('LANDING')
  return (
    <div>
      <div className="hero-landing" style={{ padding: "50px 10px" }}>
        <div className="home-container">
          <h2 className="hero-title" style={{ color: "white" }}>
            Este verano
            <br />
            no te quedes sin planes
          </h2>
          <h2 className="hero-subtitle" style={{ color: "#d0dde2" }}>
            Reserva en los mejores
            <br />
            locales de tu zona
          </h2>
          <h2 className="hero-arrow-phone mdi mdi-arrow-down"></h2>
          <h2 className="hero-arrow-desktop mdi mdi-arrow-down"></h2>
        </div>
      </div>
      <div className="mapa">
        <GeneralMap/>
      </div>
      <div className="bg-landing">
        <div className="container">
          <h2 className="title-landing text-center">Reserva en un segundo</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/1.png" className="emoji-img" />
                <h2 className="subtitle-landing">
                  Encuentra los mejores locales
                </h2>
                <p>
                  Filtra los locales por día o por categoría para encontrar el
                  ideal
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/2.png" className="emoji-img" />
                <h2 className="subtitle-landing">Crea tu reserva</h2>
                <p>Reserva rápidamente desde Kokomo en tus locales favoritos</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-blue">
                <img src="/images/3.png" className="emoji-img" />
                <h2 className="subtitle-landing">Compártela con tus amigos</h2>
                <p>Comparte los detalles de la reserva con quien quieras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="category-group" style={{ margin: "auto" }}>
        <div className="one-category">
          <Link to="/category/Surfer">
            <div className="img-container">
              <img src="/images/surf.png" alt="Surfer" />
            </div>
            <p>Surfer</p>
          </Link>
        </div>
        <div className="one-category">
          <Link to="/category/Chillout">
            <div className="img-container">
              <img src="/images/chillout.png" alt="Chillout" />
            </div>
            <p>Chillout</p>
          </Link>
        </div>
        <div className="one-category">
          <Link to="/category/Discoteca">
            <div className="img-container">
              <img src="/images/disco.png" alt="Disco" />
            </div>
            <p>Disco</p>
          </Link>
        </div>
        <div className="one-category">
          <Link to="/category/Bar">
            <div className="img-container">
              <img src="/images/bar.png" alt="Bar" />
            </div>
            <p>Bar</p>
          </Link>
        </div>
        <div className="one-category">
          <Link to="/category/Restaurante">
            <div className="img-container">
              <img src="/images/restaurant.png" alt="Bar" />
            </div>
            <p>Restaurant</p>
          </Link>
        </div>
      </div>
      <div className="landing-container" style={{ "paddingBottom": "80px" }}>
        <CarouselProperties filter="All"/>
      </div>
      <div className="banner-orange">
          <div className="row">
            <div className="col-md-6">
              <h2>
                ¿Tienes un local?
              </h2>
              <h3>
                Registra tus locales y consigue reservas de tus clientes
              </h3>
            </div>
            <div className="col-md-6">
              <a
                href="/signup-local"
                className="btn-kokomo btn-kokomo-banner float-right p-2 mt-4"
              >
                Crea tu cuenta
              </a>
            </div>
          </div>
        </div>
      <div className="footer">
        <p>
          Made in Barcelona |{" "}
          <a href="https://github.com/natalia-nly" target="_blank">
            Natalia
          </a>{" "}
          &{" "}
          <a href="https://github.com/CSS1982" target="_blank">
            Claudi
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
