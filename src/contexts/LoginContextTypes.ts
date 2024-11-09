import {User} from "../models/User.ts";

export interface LoginContextState {
    user: User,
    connecting: boolean,
}

export interface LoginContextMethods {
    login: (username: string, password: string) => Promise<void>,
    logout: () => void
}

// question : que veut dire le caractère & dans la ligne suivante ? (conseil : suivez l'utilisation des types)
export type LoginContextType = LoginContextState & LoginContextMethods
