import React from 'react'

const InputFormik = ({
   errors,
   touched,
   name,
   label,
   handleChange,
   ...rest
}) => {
   return (
      <div className="form-group">
         <label htmlFor={name} className="label active">
            {label}
         </label>
         <input
            name={name}
            className={errors ? 'errors' : ''}
            onChange={handleChange}
            errors={errors}
            {...rest}
         />
         {errors && (
            <p className="danger">
               <i className="mdi mdi-alert-circle-outline" /> {errors}
            </p>
         )}
      </div>
   )
}

export default InputFormik
