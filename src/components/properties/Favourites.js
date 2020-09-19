import React from "react";
import CarouselProperties from "./CarouselProperties";
import { SectionTitleStyle } from "../styled-components/titles";

const Favourites = () => {
  return (
    <div>
      <div className="body-container">
        <SectionTitleStyle center>Tus favoritos</SectionTitleStyle>

        <CarouselProperties filter="Favourites" />
      </div>
    </div>
  );
};

export default Favourites;
