import axiosWithAuth from "../Utils/axiosWithAuth.ts";

/*
attention ici y a pas {} car c est considerer comme une ligne donc pas besoin
pas d'accolade = return implicite
 */

export const APIgetUserGroups = () =>
    axiosWithAuth
        .get("users/protected/getGroup")
        .then((response) => response.data);
