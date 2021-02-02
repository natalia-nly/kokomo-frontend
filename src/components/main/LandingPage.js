import React from "react";
import { Link } from "react-router-dom";
import CarouselProperties from "../properties/CarouselProperties";
import GeneralMap from "../search/GeneralMap";
import Categories from "../properties/Categories";

const LandingPage = () => {
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
          <p className="hero-arrow-phone mdi mdi-arrow-down"></p>
          <p className="hero-arrow-desktop mdi mdi-arrow-down"></p>
        </div>
      </div>
      <div className="mapa">
       {/** <GeneralMap />*/} 
      </div>
      <div className="bg-landing">
        <div className="container">
          <h2 className="title-landing text-center">Reserva en un segundo</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="shadow-blue">
                <img
                  src="/images/1.png"
                  className="emoji-img"
                  alt="Busca locales"
                />
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
                <img
                  src="/images/2.png"
                  className="emoji-img"
                  alt="Crea reservas"
                />
                <h2 className="subtitle-landing">Crea tu reserva</h2>
                <p>Reserva rápidamente desde Kokomo en tus locales favoritos</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-blue">
                <img
                  src="/images/3.png"
                  className="emoji-img"
                  alt="Comparte con los amigos"
                />
                <h2 className="subtitle-landing">Compártela con tus amigos</h2>
                <p>Comparte los detalles de la reserva con quien quieras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Categories />
      </div>

      <div className="landing-container" style={{ paddingBottom: "80px" }}>
        <CarouselProperties filter="All" />
      </div>
      <div className="banner-orange">
        <div className="row">
          <div className="col-md-6">
            <h2>¿Tienes un local?</h2>
            <h3>Registra tus locales y consigue reservas de tus clientes</h3>
          </div>
          <div className="col-md-6">
            <Link
              to="/signup-local"
              className="btn-kokomo btn-kokomo-banner float-right p-2 mt-4"
            >
              Crea tu cuenta
            </Link>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          Made in Barcelona |{" "}
          <a
            href="https://github.com/natalia-nly"
            target="_blank"
            rel="noopener noreferrer"
          >
            Natalia
          </a>{" "}
          &{" "}
          <a
            href="https://github.com/CSS1982"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claudi
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
