// src/types/formInputsType.ts

export type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
}

export type LoginFormInputs = {
    email: string;
    password: string;
};