import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
   return (
      <>
         <div className="container text-center d-flex align-items-center justify-content-center vh-100">
            <div>
               <img
                  src="/images/warning.png"
                  alt="Error"
                  style={{ 'max-width': '200px' }}
               />
               <h1 className="heading-font orange mt-4">
                  Página no encontrada
               </h1>
               <p>¡Lo sentimos! Parece que no encontramos lo que buscas</p>
               <Link to="/" className="btn-kokomo btn-kokomo-grey mt-4">
                  Volver a inicio
               </Link>
            </div>
         </div>
      </>
   )
}

export default Error404
