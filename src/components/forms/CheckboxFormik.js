import { Field } from 'formik'
import React from 'react'
import { Checkbox } from '../../styles/forms'

const CheckboxFormik = ({ label, imagen, value, type, name }) => {
   return (
      <Checkbox>
         <label className="container">
            {label || value}
            {imagen ? <img src={imagen} alt="emoji" className="emoji" /> : null}
            <Field type={type} name={name} value={value} />
            <span className="checkmark"></span>
         </label>
      </Checkbox>
   )
}

export default CheckboxFormik
