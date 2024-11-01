// src/components/PasswordInput.tsx

import {useState} from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from '../types/formInputsType';
import OpenEye from './icons/OpenEye';
import CloseEye from './icons/CloseEye';
import "../styles/PasswordInput.sass";

interface PasswordInputProps {
    label: string;
    name: keyof FormInputs;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
}

function PasswordInput({name, register, error}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <div className="password-input">
                <input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    {...register(name)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={showPassword}
                >
                    {showPassword ? <OpenEye/> : <CloseEye/>}
                </button>
            </div>
            {error && <span className="error">{error.message}</span>}
        </div>
    );
}

export default PasswordInput;
