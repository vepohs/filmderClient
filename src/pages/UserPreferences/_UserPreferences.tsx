// @ts-ignore
import "./_UserPreferences.sass";
import ReWatchCheckBox from "./components/ReWatchCheckBox.tsx";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useEffect, useState} from "react"; // Assurez-vous d'avoir le style importé


function UserPreferences() {

    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [providers, setProviders] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [isRewatchChecked, setIsRewatchChecked] = useState<boolean>(false);


    const askForPreferences = async () => {
        try {
            const response = await axiosWithAuth.get("users/protected/getPreferences");
            console.log("response", response);

            const fetchedGenres = response.data.genrePreference.map((genre: { id: number; name: string }) => ({
                id: genre.id,
                name: genre.name
            }));

            const fetchedProviders = response.data.providerPreference.map((provider: {
                id: number;
                name: string;
                logoPath: string
            }) => ({
                id: provider.id,
                name: provider.name,
                logoPath: provider.logoPath
            }));

            setGenres(fetchedGenres);
            setProviders(fetchedProviders);

            console.log("fetchedGenres", fetchedGenres);
            console.log("fetchedProviders", fetchedProviders);

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
