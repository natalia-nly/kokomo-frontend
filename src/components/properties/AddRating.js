import React from 'react'
import ReactStars from "react-rating-stars-component";


const AddRating = (props) => {
    let ownRating = {
        size: 12,
        count: 5,
        color: "#ffba69",
        activeColor: "#ffba69",
        value: props.ratingComment,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: (newValue) => {
            props.handleChangeRating(newValue)
          }
      };

      
    return (
        <>
            <ReactStars {...ownRating} />
        </>
    )
}

export default AddRating
