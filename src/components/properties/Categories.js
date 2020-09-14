import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="category-group">
      <div className="one-category">
        <Link to="/category/Surfer">
          <div className="img-container">
            <img src="/images/surfer.png" alt="Surfer" />
          </div>
          <p>Surfer</p>
        </Link>
      </div>
      <div className="one-category">
        <Link to="/category/Restaurante">
          <div className="img-container">
            <img src="/images/restaurant.png" alt="Restaurant" />
          </div>
          <p>Restaurant</p>
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
        <Link to="/category/Bar">
          <div className="img-container">
            <img src="/images/bar.png" alt="Bar" />
          </div>
          <p>Bar</p>
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
      
    </div>
  );
};

export default Categories;
