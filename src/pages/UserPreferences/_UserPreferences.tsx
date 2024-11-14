// @ts-ignore
import "./_UserPreferences.sass";
import ReWatchCheckBox from "./components/ReWatchCheckBox.tsx";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useEffect} from "react"; // Assurez-vous d'avoir le style importé

const genres: string[] = ["actions", "aventure", "comédie", "drame", "fantastique", "horreur", "science-fiction", "thriller"];
const providers: string[] = ["Netflix", "Amazon Prime", "Disney+", "Hulu", "HBO Max", "Apple TV", "Peacock", "Paramount+", "Starz", "Showtime"];

function UserPreferences() {

    const askForPreferences = async () => {
        try {
            const response = await axiosWithAuth.get("users/protected/getPreferences");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <>
            <h1>GENNNNREEEEEE</h1>
            <GenresSelector genres={genres}/>
            <hr></hr>

            <h1> REWAAAAAATCH</h1>
            <ReWatchCheckBox label="Rewatch"/>
            <hr></hr>

            <h1>Providers</h1>
            <ProviderSelector providers={providers}/>
        </>


    );
}

export default UserPreferences;
