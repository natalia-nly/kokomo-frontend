import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const OwnerLocal = (props) => {

      
    return (
        <div>
            <Link to={"/property/" + props.property._id}>
                <h3>{props.property.name}</h3>
                <p className="mdi mdi-map-marker-radius">
                    {" "}
                    {props.property.name}
                </p>
            </Link>
            {props.property
                .bookings
                .map((booking, index) => (
                    <div className="group-booking" key={index}>
                        <div className="row">
                            <div className="column-xs">
                                <div>
                                    <p className="mb-4">
                                        <span className="booking-ref">{booking.bookingRef}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="far fa-calendar-check fa-stack-1x orange"></i>
                                        </span>
                                        {booking.day}
                                    </p>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="far fa-clock fa-stack-1x orange"></i>
                                        </span>
                                        {booking.time}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="fas fa-users fa-stack-1x orange"></i>
                                        </span>
                                        {booking.guests}
                                        persona(s)
                                    </p>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="fas fa-user fa-stack-1x orange"></i>
                                        </span>
                                        {booking.customer.username}
                                    </p>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="fas fa-at fa-stack-1x orange"></i>
                                        </span>
                                        {booking.customer.email}
                                    </p>
                                    <p>
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-square fa-stack-2x orange-20"></i>
                                            <i className="fas fa-phone fa-stack-1x orange"></i>
                                        </span>
                                        {booking.customer.telNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default OwnerLocal
