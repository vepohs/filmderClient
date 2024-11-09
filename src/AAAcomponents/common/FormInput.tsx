// src/AAAcomponents/FormInput.tsx
import {FieldError, FieldValues, Path, UseFormRegister} from 'react-hook-form';

import { ErrorTooltip } from "../../connection/signUp/components/ErrorTooltip.tsx";

// @ts-ignore
import "../../connection/signUp/styles/FormInput.sass";
// @ts-ignore
import '../../connection/signUp/styles/Icon.sass';

type FormInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    type: string;
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    placeholder: string;
    icon: React.ElementType;
};

function FormInput <TFormValues extends FieldValues> ({
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                       icon: Icon,
                   }: FormInputProps<TFormValues>){
    return (
        <div className="inputContainer">
            {Icon && <Icon className="icon" />}
            <input
                className="input"
                id={String(name)}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />

            {error && <ErrorTooltip message={error.message} />}
        </div>
    );
}

export default FormInput;
