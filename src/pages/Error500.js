import React from 'react'
import { Link } from 'react-router-dom'

const Error500 = () => {
   return (
      <>
         <div class="container text-center d-flex align-items-center justify-content-center vh-100">
            <div>
               <img
                  src="/images/warning.png"
                  alt="Error"
                  style={{ 'max-width': '200px' }}
               />
               <h1 class="heading-font orange mt-4">Error del servidor</h1>
               <p>¡Lo sentimos! Parece que hay un error interno.</p>
               <Link to="/" class="btn-kokomo btn-kokomo-grey mt-4">
                  Volver a inicio
               </Link>
            </div>
         </div>
      </>
   )
}

export default Error500
