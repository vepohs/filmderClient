// src/components/FormInput.tsx
import {FieldError, UseFormRegister} from 'react-hook-form';
import {FormInputs} from "../types/formInputsType";

type FormInputProps = {
    label: string;
    name: keyof FormInputs;
    type: string;
    register: UseFormRegister<FormInputs>;
    error?: FieldError;
    placeholder?: string;
    className?: string;
};

function FormInput({
                       label,
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                       className,
                   }: FormInputProps) {
    return (
        <div className={`form-group ${className || ''}`}>
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
}

export default FormInput;
