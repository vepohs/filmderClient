import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    type: string;
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    placeholder: string;
    icon: React.ElementType;
};

export interface PasswordInputProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    placeholder: string;
    icon: React.ElementType;
}
