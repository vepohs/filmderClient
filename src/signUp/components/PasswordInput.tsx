// src/components/PasswordInput.tsx

import {useState} from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from "../types/formInputsType.ts";

interface PasswordInputProps {
    name: keyof FormInputs;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder: string;
}

function PasswordInput({ name, register, error,placeholder}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <div className="password-input">
                <input
                    id={name}
                    placeholder={placeholder}
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
