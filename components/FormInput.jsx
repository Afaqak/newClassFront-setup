import React from 'react'

const FormInput = ({
    label, type, name, value, onChange, className,labelClassName,error,onBlur,loading
}) => {
  return (
    <div className="relative">
          <input
            disabled={loading}
            className={className}
            name={name}
            type={type} 
             onBlur={onBlur}
            value={value}
            onChange={onChange}
            required
          />
          <label
            htmlFor="name"
           className= {`${labelClassName}`}
          >
            <span className="content-name">
                {label}
            </span>
          </label>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
  )
}

export default FormInput