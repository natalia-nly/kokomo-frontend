import React, {useState} from "react";
import AuthService from "../auth/auth-service";

function CreateProperty(props) {
    const initialState = {
        name: "",
        description: "",
        categories: [],
        mainImage: "",
        media: [],
        location: {
            name: "",
            lat: 0,
            long: 0
        },
        openingHours: [
            {
                openingDays: {
                    openingDay: null,
                    closingDay: null
                },
                weekDays: [0],
                openingTimes: [
                    {
                        openingTime: 0,
                        closingTime: 0
                    }
                ]
            }
        ],
        bookingDuration: 0,
        availablePlaces: 0,
        comments: [
            {
                username: "",
                day: null,
                comment: ""
            }
        ],
        rating: 0,
        bookings: []
    };

    const service = new AuthService();

    const [state,
        setState] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user: this.state.user,
            password: this.state.password
        };
        this
            .service
            .login(body.user, body.password)
            .then((response) => {
                setState({user: "", password: ""});
                props.callback(response);
                props
                    .history
                    .push("/profile");
            })
            .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
        console.log(e.target);
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleOpeningDay = (e) => {
        let openingHours = [...state.openingHours];
        openingHours[0].openingDays.openingDay = e.target.value;
        setState({
            ...state,
            openingHours: openingHours
        });
    };

    const handleClosingDay = (e) => {
        let openingHours = [...state.openingHours];
        openingHours[0].openingDays.closingDay = e.target.value;
        setState({
            ...state,
            openingHours: openingHours
        });
    };

    const handleOpeningTime = (e) => {
        let openingHours = [...state.openingHours];
        openingHours[0].openingTimes[0].openingTime = e.target.value;
        setState({
            ...state,
            "openingHours.openingTimes": openingHours
        });
    };

    const handleClosingTime = (e) => {
        let openingHours = [...state.openingHours];
        openingHours[0].openingTimes[0].closingTime = e.target.value;
        setState({
            ...state,
            "openingHours.openingTimes": openingHours
        });
    };

    return (
        <div className="body-container">
            <div className="hero">
                <h2 className="hero-title">Crea tu local</h2>
                <h2 className="hero-subtitle">
                    Rellena los datos de tu local y consigue reservas
                </h2>
                <h2 className="hero-arrow-phone mdi mdi-arrow-down"></h2>
                <h2 className="hero-arrow-desktop mdi mdi-arrow-down"></h2>
            </div>
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <h3 className="section-title">Datos principales</h3>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="label active">
                                Nombre
                            </label>
                            <input type="text" name="name" value={state.name} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="label active">
                                Descripción
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={state.description}
                                onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-image" className="label active">
                                Imagen Principal
                            </label>
                            <input type="file" name="main" id="input-image-main"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="input-media" className="label active">
                                Imagen Secundaria
                            </label>
                            <input type="file" name="media" id="input-image-media"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-ubication" className="label active">
                                Ubicación
                            </label>
                            <input type="text" name="ubication" id="input-ubication"/>
                        </div>
                       
                    </div>
                </div>
                <h3 className="section-title">Horarios</h3>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="input-opening" className="label active">
                                Día de apertura
                            </label>
                            <input
                                type="date"
                                name="openingHours"
                                id="input-opening"
                                value={state.openingHours[0].openingDays.openingDay}
                                onChange={handleOpeningDay}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-closing" className="label active">
                                Día de cierre
                            </label>
                            <input
                                type="date"
                                name="closing"
                                id="input-closing"
                                value={state.openingHours[0].openingDays.closingDay}
                                onChange={handleClosingDay}/>
                        </div>

                        <h6>Días de la semana</h6>
                        <div className="form-group">
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-monday"
                                            name="monday"
                                            value={1}/>
                                        <label className="custom-control-label" htmlFor="input-monday">
                                            Lunes
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-tuesday"
                                            name="tuesday"
                                            value={2}/>
                                        <label className="custom-control-label" htmlFor="input-tuesday">
                                            Martes
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-wednesday"
                                            name="wednesday"
                                            value={3}/>
                                        <label className="custom-control-label" htmlFor="input-wednesday">
                                            Miércoles
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-thursday"
                                            name="thursday"
                                            value={4}/>
                                        <label className="custom-control-label" htmlFor="input-thursday">
                                            Jueves
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-friday"
                                            name="friday"
                                            value={5}/>
                                        <label className="custom-control-label" htmlFor="input-friday">
                                            Viernes
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-saturday"
                                            name="saturday"
                                            value={6}/>
                                        <label className="custom-control-label" htmlFor="input-saturday">
                                            Sábado
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="input-sunday"
                                            name="sunday"
                                            value={0}/>
                                        <label className="custom-control-label" htmlFor="input-sunday">
                                            Domingo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="input-openhour" className="label active">
                                Hora de apertura
                            </label>
                            <input
                                type="number"
                                name="openingHours"
                                id="input-opening"
                                value={state.openingHours[0].openingDays.openingDay}
                                onChange={handleOpeningTime}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-closehour" className="label active">
                            Hora de cierre
                            </label>
                            <input
                                type="number"
                                name="closingHours"
                                id="input-closehour"
                                value={state.openingHours[0].openingDays.closingDay}
                                onChange={handleClosingTime}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingDuration" className="label active">
                            Duración de la reserva (en minutos)
                            </label>
                            <input
                                type="number"
                                name="bookingDuration"
                                value={state.bookingDuration}
                                onChange={handleChange}/>
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="input-places" className="label active">
                                Plazas
                            </label>
                            <input type="number" name="places" id="input-places"/>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-kokomo btn-kokomo-success">
                    Crear propiedad y horarios
                </button>
            </form>
        </div>
    );
}

export default CreateProperty;
