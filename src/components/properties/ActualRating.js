import React from "react";
import ReactStars from "react-rating-stars-component";

const ActualRating = (props) => {
  let actualRating = {
    size: 12,
    count: 5,
    color: "#174e67",
    activeColor: "#174e67",
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: (
      <i
        className="fa fa-star-half-alt"
        style={{
          color: "#174e67",
        }}
      />
    ),
    filledIcon: <i className="fa fa-star" />,
    edit: false,
    value: props.rate,
  };

  return (
    <>
      <div className="d-flex">
        <ReactStars {...actualRating} />
        <p className="text-review">
          {props.numberReviews}{" "}
          {props.numberReviews === 1 ? "reseña" : "reseñas"}
        </p>
      </div>
    </>
  );
};

export default ActualRating;
