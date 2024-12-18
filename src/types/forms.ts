import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

export type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
};

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
