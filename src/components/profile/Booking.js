import React, {useState, useEffect} from "react";
import DetailedMap from "../search/DetailedMap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const initialState = {
    bookingId: ""
};

const Booking = (props) => {
    const [state,
        setState] = useState(initialState);

    console.log("estamos en booking");
    console.log(props);
    useEffect(() => {
        setState({
            ...state,
            bookingId: props.booking._id,
            bookingRef: props.booking.bookingRef,
            day: props.booking.day,
            time: props.booking.time,
            guests: props.booking.guests,
            lat: props.booking.property.location.lat,
            lng: props.booking.property.location.long,
            property: props.booking.property,
            name: props.booking.property.name
        });
    }, []);

    return (
        <div className="group-booking">
        <div className="row">
            <div className="column-xs">
                <div>
                    <p className="mb-4">
                        <span className="booking-ref">{state.bookingRef}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="fa-stack fa-lg">
                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                            <i className="far fa-calendar-check fa-stack-1x orange"></i>
                        </span>
                        {state.day}
                    </p>
                    <p>
                        <span className="fa-stack fa-lg">
                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                            <i className="far fa-clock fa-stack-1x orange"></i>
                        </span>
                        {state.time}
                    </p>
                </div>
                <div>
                    <p>
                        <span className="fa-stack fa-lg">
                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                            <i className="fas fa-users fa-stack-1x orange"></i>
                        </span>
                        {state.guests}
                        persona(s)
                    </p>
                    <p>
                        <span className="fa-stack fa-lg">
                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                            <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
                        </span>
                        {state.name}
                    </p>
                </div>
            </div>
            <div className="column-m">
                <DetailedMap lat={state.lat} lng={state.lng} property={state.property}/>
            </div>
        </div>
        {/* <div className="row">
        <div>
          <form onSubmit={props.delete}>
            <input type="hidden" name="bookingId" value={state.bookingId} />
            <button className="kokomo-btn-form p-2">Cancelar reserva</button>
          </form>
        </div> */}
        <DropdownButton
            id="dropdown-item-button"
            variant="warning"
            title="Acciones"
            className="float-right">
            <form onSubmit={props.delete}>
                <input type="hidden" name="bookingId" value={state.bookingId}/>
                <button className="kokomo-btn-form p-2">Cancelar reserva</button>
            </form>
            <Dropdown.Item
                variant="success"
                href="whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-app.herokuapp.com/booking/details/{{_id}}">Compartir reserva</Dropdown.Item>
        </DropdownButton>
    </div> 
  );
};

export default Booking;