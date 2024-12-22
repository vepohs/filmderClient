import {FieldValues} from 'react-hook-form';
import { ErrorTooltip } from "./ErrorTooltip.tsx";
import {FormInputProps} from "../../types/forms.ts";

// @ts-ignore
import "../style/FormInput.sass";
// @ts-ignore
import '../style/Icon.sass';


function FormInput <TFormValues extends FieldValues> ({
                       name,
                       type,
                       register,
                       error,
                       placeholder,
                       icon: Icon,
                   }: FormInputProps<TFormValues>){
    return (
        <div                 className={`inputContainer ${error ? 'wrongInput' : ''}`}
                              >
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
