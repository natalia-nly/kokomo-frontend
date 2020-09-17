import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";


const Booking = (props) => {
  

  console.log("estamos en booking");
  console.log(props);

  const handleSubmit = (e) =>{
    console.log("booking ->delete",props.booking._id )
    props.delete(props.booking._id)
  }


  return (
    <>
      <div className="div-booking">
        <div className="column-xs">
          <p className="mb-4">
            <span className="booking-ref">{props.booking.bookingRef}</span>
          </p>
        </div>
        <div className="column-xl">
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="far fa-calendar-check fa-stack-1x orange"></i>
            </span>
            {props.booking.day}
          </p>
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="far fa-clock fa-stack-1x orange"></i>
            </span>
            {props.booking.time}
          </p>
        </div>
        <div className="column-xl">
          <p>
            <Link to={"/property/" + props.booking.property._id}>
              <span className="fa-stack fa-lg">
                <i className="fas fa-square fa-stack-2x orange-20"></i>
                <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
              </span>
              {props.booking.property.name}
            </Link>
          </p>
          <p>
            <span className="fa-stack fa-lg">
              <i className="fas fa-square fa-stack-2x orange-20"></i>
              <i className="fas fa-users fa-stack-1x orange"></i>
            </span>
            {props.booking.guests}
            persona(s)
          </p>
        </div>
        <div className="column-xs">
          <DropdownButton
            id="dropdown-kokomo-button"
            title={<i className="fas fa-ellipsis-v"></i>}
            className="float-right"
          >
            <Dropdown.Item variant="success" className="dropdown-item">
              <Link to={"/booking/details/" + props.booking._id}>
                <i className="mdi mdi-eye"></i> Ver detalles
              </Link>
            </Dropdown.Item>

            <Dropdown.Item
              variant="success"
              className="dropdown-item"
              href={
                "whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-react.herokuapp.com/#/booking/details/" +
                props.booking._id
              }
            >
              <i className="mdi mdi-share-variant"></i> Compartir reserva
            </Dropdown.Item>
            <Dropdown.Divider />
            <form onSubmit={handleSubmit} className="dropdown-item danger">      
              <button className="link-danger">
                <i className="far fa-trash-alt"></i> Cancelar reserva
              </button>
            </form>
          </DropdownButton>
        </div>
      </div>
    </>
  );
};

export default Booking;
