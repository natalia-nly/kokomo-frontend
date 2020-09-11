import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const Profile = (props) => {

    console.log("estamos en profile");
    console.log(props.loggedInUser)

    return (
        <div>
            <div className="beach-background">
                <div className="text-right">
                    <Link to="/profile/edit" className="btn-kokomo btn-kokomo-grey mr-3">
                        Configuración
                    </Link>
                    <Link to="/logout" className="btn-kokomo btn-kokomo-danger">
                        Cerrar sesión
                    </Link>
                </div>
            </div>

            <div
                className="text-center"
                style={{
                borderRadius: "30px",
                marginTop: "-30px",
                backgroundColor: "white",
                paddingBottom: "30px"
            }}>
                <img src={props.loggedInUser.avatar} alt="Avatar" className="avatar"/>

                <h2>Hola {props.loggedInUser.username}!</h2>
                <p>email: {props.loggedInUser.email}</p>
                <p>Número de teléfono: {props.loggedInUser.telNumber}</p>
            </div>
            <div className="body-container">
                <div className="row">
                    <div className="col">
                        <Link to="/search" className="btn-kokomo btn-kokomo-success float-right">
                            Crear una nueva reserva
                        </Link>
                        <div className="col">
                            <Link
                                to="/property/create-property"
                                className="btn-kokomo btn-kokomo-success float-right">
                                Crear un nuevo local
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
