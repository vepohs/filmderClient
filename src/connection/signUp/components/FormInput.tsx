// src/components/FormInput.tsx
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from "../types/formInputsType.ts";
// @ts-ignore
import "../styles/FormInput.sass";
import {Tooltip} from "react-tooltip";
import {ErrorTooltip} from "./ErrorTooltip.tsx";


type FormInputProps = {
    name: keyof FormInputs;
    type: string;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder: string;
};


function FormInput({
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                   }: FormInputProps) {
    return (
        <div className="inputContainer">
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <ErrorTooltip message={error.message} />}
        </div>
    );
}


export default FormInput;
