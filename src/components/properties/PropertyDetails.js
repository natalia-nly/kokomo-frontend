import React, {useState, useEffect} from "react";
import axios from "axios";

const PropertyDetails = (props) => {
    const initialState = {
        property: {
            name: '',
            location: {
                name: 'Test'
            },
            openingHours: [{
                openingDays: {
                    openingDay: '',
                    closingDay: ''
                },
                openingTimes: [
                    {
                      openingTime: 0,
                      closingTime: 0
                    }
                ],
                weekDays: []
            }],
            bookings: []
        }
    };

    const [state,
        setState] = useState(initialState);

    useEffect(() => {
        console.log(props)
        axios
            .get("http://localhost:5000/api/property/" + props.match.params.propertyId, {withCredentials: true})
            .then((response) => {
                console.log("CONSOLE LOG DESDE AXIOS GET", response);
                setState({
                    ...state,
                    property: response.data
                });
            });
    }, [2]);

    let property = state.property
    console.log(state.property)

    return (
        <div>
            <div
                className="home-bg image-background"
                style={{
                "background-image": `url(${state.property.mainImage})`
            }}>
                <div className="container-left"></div>

                <div className="white-card">
                    <div className="title-heart">
                        <div>
                            <span className="fa-stack fa-2x mr-4">
                                <i className="fas fa-circle fa-stack-2x orange"></i>
                                <i className="far fa-heart fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>
                        <div>
                            <h2 className="title-search">{state.property.name}</h2>

                        </div>
                    </div>
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a
                                className="nav-item nav-link "
                                id="nav-description-tab"
                                data-toggle="tab"
                                href="#nav-description"
                                role="tab"
                                aria-controls="nav-description"
                                aria-selected="false">Descripción</a>
                            <a
                                className="nav-item nav-link"
                                id="nav-comments-tab"
                                data-toggle="tab"
                                href="#nav-comments"
                                role="tab"
                                aria-controls="nav-comments"
                                aria-selected="false">Comentarios</a>
                            <a
                                className="nav-item nav-link"
                                id="nav-openings-tab"
                                data-toggle="tab"
                                href="#nav-openings"
                                role="tab"
                                aria-controls="nav-openings"
                                aria-selected="false">Horarios</a>
                            <a
                                className="nav-item nav-link active"
                                id="nav-reservations-tab"
                                data-toggle="tab"
                                href="#nav-reservations"
                                role="tab"
                                aria-controls="nav-reservations"
                                aria-selected="true">Reservas</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className="tab-pane fade"
                            id="nav-description"
                            role="tabpanel"
                            aria-labelledby="nav-description-tab">
                            <h3 className="subtitle-search mb-4">{state.property.description}</h3>
                            <p>
                                <i className="fas fa-map-marker-alt"></i>
                                {state.property.location.name}
                            </p>
                            <p>Duración de la reserva: {state.property.bookingDuration}</p>
                            <p>Plazas disponibles: {state.property.availablePlaces}</p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="nav-comments"
                            role="tabpanel"
                            aria-labelledby="nav-comments-tab">...</div>
                        <div
                            className="tab-pane fade"
                            id="nav-openings"
                            role="tabpanel"
                            aria-labelledby="nav-openings-tab">
                            <h3 className="subtitle-search mb-4">Días de apertura</h3>

                            <p>Día de apertura:
                                <span id="openingDay1">{state.property.openingHours[0].openingDays.openingDay}</span>
                            </p>

                            <p>Día de cierre:
                                <span id="closingDay1">{state.property.openingHours[0].openingDays.closingDay}</span>
                            </p>

                            <p>Días de la semana: {state.property.openingHours[0].weekDays}</p>

                            <p>Hora de apertura: {state.property.openingHours[0].openingTimes.openingTime}</p>
                            <p>Hora de cierre: {state.property.openingHours[0].openingTimes.closingTime}</p>

                        </div>
                        <div
                            className="tab-pane fade show active"
                            id="nav-reservations"
                            role="tabpanel"
                            aria-labelledby="nav-reservations-tab">
                            <h3 className="subtitle-search mb-4">Reservas activas: {state.property.bookings.length}</h3>

                            <p>Código de la reserva: {state.property.bookingRef}</p>

                        </div>
                    </div>

                    <form action="/local/{{property._id}}" method="POST" className="mt-4">
                        <div className="display-form mb-3">
                            <div>
                                <input
                                    type="date"
                                    name="bookingDate"
                                    data-date-format="DD MMMM YYYY"
                                    id=""
                                    className="kokomo-input"/>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="numberGuests"
                                    id=""
                                    min="0"
                                    className="kokomo-input"
                                    placeholder="Personas"/>
                            </div>
                        </div>
                        <input type="submit" value="Ver disponibilidad" className="kokomo-btn-form"/>
                    </form>

                    <div className="mt-4 border-top">
                        <p>Necesitas una cuenta para poder hacer reservas.</p>
                        <a href="/signup" className="btn btn-success mt-3">Regístrate ahora</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyDetails;
