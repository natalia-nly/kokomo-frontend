import React from "react";
import ReactStars from "react-rating-stars-component";

const ActualRatingCarousel = (props) => {

  let actualRating = {
    size: 12,
    count: 5,
    color: "#ffba69",
    activeColor: "#ffba69",
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: (
      <i className="fa fa-star-half-alt" style={{ color: "#ffba69" }} />
    ),
    filledIcon: <i className="fa fa-star" />,
    edit: false,
    value: props.rate,
  }

  return (
    <>
      <div className="d-flex">
        <ReactStars {...actualRating} />
        <p className="text-review">
          {props.numberReviews >= 1 ? `(${props.numberReviews})` : ""}
        </p>
      </div>
    </>
  );
};

export default ActualRatingCarousel;
