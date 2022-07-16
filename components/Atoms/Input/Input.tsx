import React from 'react';
import { FieldError, RegisterOptions, UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';

interface InputProps { 
  id: string
  label: string
  name: string
  type: string
  placeholder?: string
  register: UseFormReturn['register']
  requiredMessage?: string
  setValueAs?: () => void
  errors?: FieldError
  errorMessage?: string
}

const Input = ({ id, label, name, type, placeholder, register, requiredMessage, setValueAs, errors, errorMessage }: InputProps) => {

  return (
    <div className={''}>
      <label
        htmlFor={id}
        className={`block`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        autoFocus={false}
        {...register(name, {
          required: requiredMessage,
          setValueAs: setValueAs
        })}
        className={`w-full form-input`}
      />
      {errors && <p className='mt-1 text-red-600'>{errorMessage}</p>}
    </div>
  );
}

export default Input;