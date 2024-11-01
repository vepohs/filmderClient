// src/components/PasswordInput.tsx

import {useState} from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from "../types/formInputsType.ts";

interface PasswordInputProps {
    label: string;
    name: keyof FormInputs;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
}

function PasswordInput({label, name, register, error}: PasswordInputProps) {
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
}

export default PasswordInput;
