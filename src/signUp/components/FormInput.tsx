// src/components/FormInput.tsx
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from "../types/formInputsType";
import "../styles/formInput.sass";
import {Tooltip} from "react-tooltip";
import Warning from "./icons/Warning.tsx";


type FormInputProps = {
    name: keyof FormInputs;
    type: string;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder?: string;
    className?: string;
};


function FormInput({
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                       className,
                   }: FormInputProps) {
    return (
        <div className={`form-group ${className || ''}`}>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && (
                <a data-tooltip-id="my-tooltip"
                   data-tooltip-content={error.message}
                   data-tooltip-variant="error"
                   data-tooltip-place="top"
                >
                    <Warning/>
                </a>
            )}
            <Tooltip id="my-tooltip" className="tooltip"
            />
        </div>
    );
}


export default FormInput;
