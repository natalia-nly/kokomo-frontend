import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    console.log('estamos en profile')
    return (
        <div>
            <div className="beach-background">
                <div className="text-right">
                    <Link to="/profile/edit" className="btn-kokomo btn-kokomo-grey mr-3">
                    Configuración</Link>
                    <a href="/logout" className="btn-kokomo btn-kokomo-danger">Cerrar sesión</a>
                </div>
            </div>
           
            <div className="text-center" style={{borderRadius: "30px", 
                marginTop: "-30px",
                backgroundColor: "white",
                paddingBottom: "30px"}}>

                <img src="{{user.avatar}}" alt="Avatar" className="avatar" />

                <h2>USERNAME</h2>
                <p>EMAIL</p>
                <p>telNumber</p>
            </div>
            <div className = "body-container">
            <div className="row">
                <div className="col">
                <Link to="/property/create-property" className="btn-kokomo btn-kokomo-success float-right">
                    Crear un nuevo local</Link>
                </div>
            </div>

            <h4 className="section-title"> Tus Locales</h4>


  </div>
 

</div>
)
}

export default Profile
