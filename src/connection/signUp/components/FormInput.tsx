// src/components/FormInput.tsx
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FormInputs } from "../types/formInputsType.ts";
// @ts-ignore
import "../styles/FormInput.sass";
// @ts-ignore
import '../styles/Icon.sass';
import { ErrorTooltip } from "./ErrorTooltip.tsx";

type FormInputProps = {
    name: keyof FormInputs;
    type: string;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder: string;
    icon: React.ElementType;
};

function FormInput({
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                       icon: Icon,
                   }: FormInputProps) {
    return (
        <div className="inputContainer">
            {Icon && <Icon className="icon" />}
            <input
                className="input"
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
