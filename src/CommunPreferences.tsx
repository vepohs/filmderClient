import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import GenresSelector from "./pages/UserPreferences/components/GenresSelector.tsx";
import ReWatchCheckBox from "./pages/UserPreferences/components/ReWatchCheckBox.tsx";
import ProviderSelector from "./pages/UserPreferences/components/ProvidersSelector.tsx";
import axiosWithAuth from "./axiosUtils/axiosConfig.ts";

interface PreferencesFormProps {
    type: string;
}

interface PreferencesData {
    genrePreferenceIds: number[];
    providerPreferenceIds: number[];
    rewatchPreference: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
                                                             type
                                                         }) => {

    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [providers, setProviders] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [isRewatchChecked, setIsRewatchChecked] = useState<boolean>(false);

    const {groupId} = useParams();

    const navigate = useNavigate();

    const askForAllPreferences = async () => {
        try {
            const response = await axiosWithAuth.get("users/protected/getPreferences");
            console.log("response", response);

            const fetchedGenres = response.data.genrePreference.map((genre: { id: number; name: string }) => ({
                id: genre.id,
                name: genre.name,
            }));

            const fetchedProviders = response.data.providerPreference.map((provider: {
                id: number;
                name: string;
                logoPath: string;
            }) => ({
                id: provider.id,
                name: provider.name,
                logoPath: provider.logoPath,
            }));

            setGenres(fetchedGenres);
            setProviders(fetchedProviders);
        } catch (error) {
            console.error(error);
        }
    }


    const requestPreferences = () => {
        if (type === "user") {
            return axiosWithAuth.get("users/protected/getUserPreferences");
        } else if (type === "group") {
            if (!groupId) {
                throw new Error("groupId est requis pour récupérer les préférences du groupe.");
            }
            return axiosWithAuth.get(`group/protected/getGroupPreference`, {
                params: {groupId},
            });
        } else {
            throw new Error("Type invalide");
        }
    };

    const submitPreferencesRequest = (data: PreferencesData) => {
        if (type === "user") {
            return axiosWithAuth.post("users/protected/setPreferences", data);
        } else if (type === "group") {
            const groupData = {
                ...data,
                groupId,
            };
            return axiosWithAuth.post("group/protected/setGroupPreference", groupData);

        } else {
            throw new Error("Type invalide");
        }
    };

    const askForPreferences = async () => {
        try {
            console.log("getPreferencesUrl", requestPreferences());
            const response = await requestPreferences()
            console.log("UUUUUUUUUUUUUUUUUUUUU", response);
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

    const submitPreferences = async () => {
        try {

            const data: PreferencesData = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
                rewatchPreference: isRewatchChecked,
            };
            console.log("ICIII", data);
            await submitPreferencesRequest(data);

            // Sans ca y a pas de vérif de préférences donc
            // Soit le gars peut tt retirer et ca marche
            // Soit a la création du compte hasPreferences reste a faux et ca redirige pas vers /protected
            // Au pire on enmpec
            // getPreferences();
            alert("Préférences enregistrées avec succès !");
            navigate("/protected");

        } catch (error) {
            console.error("Erreur lors de l'envoi des préférences:", error);
            alert("Une erreur s'est produite lors de l'enregistrement des préférences.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await askForAllPreferences();
            await askForPreferences();
        };
        fetchData();
    }, []);

    return (
        <div className="PreferencesGlobal">
            <h1>Genres</h1>
            <GenresSelector
                genres={genres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />
            <hr/>

            <h1>Rewatch</h1>
            <ReWatchCheckBox
                label="Rewatch"
                isChecked={isRewatchChecked}
                setIsChecked={setIsRewatchChecked}
            />
            <hr/>

            <h1>Providers</h1>
            <ProviderSelector
                providers={providers}
                selectedProviders={selectedProviders}
                setSelectedProviders={setSelectedProviders}
            />

            <button onClick={submitPreferences} className="submitButton">
                Enregistrer les préférences
            </button>
        </div>
    );
};

export default PreferencesForm;
