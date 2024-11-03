// src/components/PasswordInput.tsx

import {useState} from 'react';
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from '../types/formInputsType.ts';
import OpenEyeIcon from './icons/OpenEyeIcon.tsx';
import CloseEyeIcon from './icons/CloseEyeIcon.tsx';
// @ts-ignore
import "../styles/PasswordInput.sass";
import WarningIcon from "./icons/WarningIcon.tsx";
import {Tooltip} from "react-tooltip";


interface PasswordInputProps {
    name: keyof FormInputs;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder: string;
}

function PasswordInput({name, register, error, placeholder}: PasswordInputProps) {
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
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={showPassword}
                >
                    {showPassword ? <OpenEyeIcon/> : <CloseEyeIcon/>}
                </button>
            </div>
            {error && (
                <a data-tooltip-id="my-tooltip1"
                   data-tooltip-content={error.message}
                   data-tooltip-variant="error"
                   data-tooltip-place="top"
                >
                    <WarningIcon/>
                </a>
            )}
            <Tooltip id="my-tooltip1" className="tooltip" positionStrategy="fixed"
            />
        </div>
    );
}

export default PasswordInput;
