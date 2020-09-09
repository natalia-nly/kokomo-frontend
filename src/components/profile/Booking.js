import React, {useState, useEffect} from "react";
import axios from "axios";
import DetailedMap from "../search/DetailedMap"

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
            bookingId: props.booking.bookingId,
            lat:props.booking.property.location.lat,
            lng:props.booking.property.location.long,
            property: props.booking.property
        });
    }, []);

    const deleteBooking = (event) => {
        event.preventDefault();
        console.log(state.bookingId);
        axios.post(process.env.REACT_APP_API_URL + "/booking/delete/" + event.target.bookingId.value, {}, {withCredentials: true}).then((response) => {
            console.log(response.data);
            props.callback();
        });
    };

    return (
        <div className="group-booking">
            <div className="row">
                <div className="column-xs">
                    <div >
                        <p className="mb-4">
                            <span className="booking-ref">{props.booking.bookingRef}</span>
                        </p>
                    </div>
                    <div >
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
                    <div >
                        <p>
                            <span className="fa-stack fa-lg">
                                <i className="fas fa-square fa-stack-2x orange-20"></i>
                                <i className="fas fa-users fa-stack-1x orange"></i>
                            </span>
                            {props.booking.guests}
                            persona(s)
                        </p>
                        <p>
                            <span className="fa-stack fa-lg">
                                <i className="fas fa-square fa-stack-2x orange-20"></i>
                                <i className="fas fa-map-marker-alt fa-stack-1x orange"></i>
                            </span>
                            {props.booking.property.name}
                        </p>
                    </div>

                </div>
                <div className="column-m">
                    <DetailedMap lat={state.lat}  lng={state.lng} property={state.property}/>
                </div>
            </div>
            <div className="row">
            <div>
                    <form onSubmit={deleteBooking}>
                        <input type="hidden" name="bookingId" value={props.booking._id}/>
                        <button className="kokomo-btn-form p-2">Cancelar reserva</button>
                    </form>
                </div>
            </div>

           {/* <div className="dropdown dropleft float-right">
                <div>
                    <form onSubmit={deleteBooking}>
                        <input type="hidden" name="bookingId" value={props.booking._id}/>
                        <button className="kokomo-btn-form p-2">Cancelar reserva</button>
                    </form>
                </div>
                <div className="dropdown dropleft float-right">
                    <button
                        className="btn-kokomo btn-kokomo-grey"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href={"/booking/details/" + props.booking._id}>
                            <i className="mdi mdi-eye"></i>
                            Ver detalles
                        </a>
                        <a
                            className="dropdown-item"
                            href="whatsapp://send?text=¡Te espera una reserva de Kokomo! 😎 Aquí tienes los detalles: http://kokomo-app.herokuapp.com/booking/details/{{_id}}">
                            <i className="mdi mdi-share-variant"></i>
                            Compartir reserva
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="danger ml-4" href={"/booking/delete/" + props.booking._id}>
                            <i className="far fa-trash-alt"></i>
                            Cancelar reserva
                        </a>
                    </div>
                </div>
            </div>  */}
        </div>
    );
};

export default Booking;
