export interface LoginResponse {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

export type LoginFormInputs = {
    email: string;
    password: string;
};
