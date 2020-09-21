import React from "react";
import { Link } from "react-router-dom";
import { CategoriesStyles } from "../styled-components/PropertiesStyles";

const Categories = () => {
  const categoriesArr = ["Surfer", "Restaurant", "Chillout", "Bar", "Disco"];

  const allCategories = categoriesArr.map((category, index) => (
    <div key={index}>
      <Link to={`/category/${category}`}>
        <img src={`/images/${category}.png`} alt={category} />
        <p>{category}</p>
      </Link>
    </div>
  ));

  return <CategoriesStyles>{allCategories}</CategoriesStyles>;
};

export default Categories;
