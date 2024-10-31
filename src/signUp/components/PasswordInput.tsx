// src/components/PasswordInput.tsx

import React, {useState} from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {IFormInputs} from "../types/formInputs.ts";

interface PasswordInputProps {
    label: string;
    name: keyof IFormInputs;
    register: UseFormRegister<IFormInputs>;
    error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({label, name, register, error}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="password-input">
                <input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    {...register(name)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Masquer' : 'Afficher'}
                </button>
            </div>
            {error && <span className="error">{error.message}</span>}
        </div>
    );
};

export default PasswordInput;
