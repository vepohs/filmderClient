// src/components/FormInput.tsx

import React from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {IFormInputs} from "../types/formInputs.ts";


interface FormInputProps {
    label: string;
    name: keyof IFormInputs;
    type: string;
    register: UseFormRegister<IFormInputs>;
    error?: FieldError;
    placeholder?: string;
    className?: string;
}


const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 name,
                                                 type,
                                                 register,
                                                 error,
                                                 placeholder,
                                                 className,
                                             }) => {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <span className="error">{error.message}</span>}
        </div>
    );
};

export default FormInput;
