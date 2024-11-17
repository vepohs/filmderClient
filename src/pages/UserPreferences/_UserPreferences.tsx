// @ts-ignore
import "./_UserPreferences.sass";
import ReWatchCheckBox from "./components/ReWatchCheckBox.tsx";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {usePreferences} from "../../context/PreferenceProvider.tsx"; // Assurez-vous d'avoir le style importé


function UserPreferences() {

    const {getPreferences} = usePreferences();


    // Verif mais je crois que ducoup des qu'on va modifier un truc ca va tt re render
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [providers, setProviders] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [isRewatchChecked, setIsRewatchChecked] = useState<boolean>(false);

    const navigate = useNavigate(); // Initialiser useNavigate

    // Fonction pour envoyer les préférences sélectionnées au backend
    const submitPreferences = async () => {
        try {
            const data = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
                rewatchPreference: isRewatchChecked,
            };
            await axiosWithAuth.post("users/protected/setPreferences", data);

            // Sans ca y a pas de vérif de préférences donc
            // Soit le gars peut tt retirer et ca marche
            // Soit a la création du compte hasPreferences reste a faux et ca redirige pas vers /protected
            getPreferences();
            alert("Préférences enregistrées avec succès !");
            navigate("/protected");

        } catch (error) {
            console.error("Erreur lors de l'envoi des préférences:", error);
            alert("Une erreur s'est produite lors de l'enregistrement des préférences.");
        }
    };

    const askForAllPreferences = async () => {
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
        } catch (error) {
            console.error(error);
        }
    }

    const askForUserPreferences = async () => {
        try {
            const response = await axiosWithAuth.get("users/protected/getUserPreferences");

            // Extraction et mise à jour des préférences utilisateur
            const userGenrePreferences = response.data.genrePreference.map((genre: {
                id: number;
                name: string
            }) => genre.id);
            const userProviderPreferences = response.data.providerPreference.map((provider: {
                id: number;
                name: string
            }) => provider.id);

            setSelectedGenres(userGenrePreferences);
            setSelectedProviders(userProviderPreferences);
        } catch (error) {
            console.error("Erreur lors de la récupération des préférences utilisateur:", error);
            alert("Impossible de récupérer les préférences utilisateur. Veuillez réessayer.");
        }
    };


    useEffect(() => {
        askForAllPreferences();
        askForUserPreferences();
    }, []);

    return (
        <>
            <h1>GENNNNREEEEEE</h1>
            <GenresSelector
                genres={genres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />
            <hr></hr>

            <h1> REWAAAAAATCH</h1>
            <ReWatchCheckBox label="Rewatch" isChecked={isRewatchChecked} setIsChecked={setIsRewatchChecked}/>
            <hr></hr>

            <h1>Providers</h1>
            <ProviderSelector
                providers={providers}
                selectedProviders={selectedProviders}
                setSelectedProviders={setSelectedProviders}
            />
            <button onClick={submitPreferences} className="submitButton">
                Enregistrer les préférences
            </button>
        </>

    );
}

export default UserPreferences;
