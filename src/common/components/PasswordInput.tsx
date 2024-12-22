import {useState} from 'react';
import {FieldValues} from 'react-hook-form';
import {SvgOpenEyeIcon} from '../icons/SvgOpenEyeIcon.tsx';
import {SvgCloseEyeIcon} from '../icons/SvgCloseEyeIcon.tsx';
import {Tooltip} from "react-tooltip";
import {ErrorTooltip} from "./ErrorTooltip.tsx";
import {PasswordInputProps} from "../../types/forms.ts";

// @ts-ignore
import "../style/Icon.sass";
// @ts-ignore
import "../style/PasswordInput.sass";




function PasswordInput<TFormValues extends FieldValues>({name, register, error, placeholder,icon :Icon}: PasswordInputProps<TFormValues>) {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className={`inputPasswordContainer${error ? ' wrongInput' : ''}`}>
            {Icon && <Icon className="icon" />}
            <input className='inputPassword'
                id={String(name)}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                {...register(name)}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="passwordToggleBtn"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                aria-pressed={showPassword}
                tabIndex={-1}
            >
                {showPassword ? <SvgOpenEyeIcon/> : <SvgCloseEyeIcon/>}
            </button>
            {error &&
                <ErrorTooltip message={error.message}/>
            }
            <Tooltip id="my-tooltip1" className="tooltip" positionStrategy="fixed"/>
        </div>


    );
}

export default PasswordInput;
