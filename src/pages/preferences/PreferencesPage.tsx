import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import GenresSelector from "./components/GenresSelector.tsx";
import ReWatchCheckBox from "./components/ReWatchCheckBox.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "../../context/SelectedGroupContext.tsx";

// @ts-ignore
import "./_PreferencesPage.sass"
import {usePreferences} from "../../context/PreferenceContext.tsx";

interface PreferencesData {
    genrePreferenceIds: number[];
    providerPreferenceIds: number[];
    rewatchPreference: boolean;
}

const PreferencesForm: React.FC = () => {

    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [providers, setProviders] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [isRewatchChecked, setIsRewatchChecked] = useState<boolean>(false);

    const {selectedGroup} = useSelectedGroup();
    const {getPreferences} = usePreferences();

    const navigate = useNavigate();

    const askForAllPreferences = async () => {
        console.log("SELECTDSGROUP ")
        console.log(selectedGroup)
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
        if (selectedGroup === "me") {
            return axiosWithAuth.get("users/protected/getUserPreferences");
        } else {
            return axiosWithAuth.get(`group/protected/getGroupPreference`, {
                params: {groupId: selectedGroup},
            });
        }
    };

    const submitPreferencesRequest = (data: PreferencesData) => {
        if (selectedGroup === "me") {
            return axiosWithAuth.post("users/protected/setPreferences", data);
        } else {
            const groupData = {
                ...data,
                groupId: selectedGroup,
            };
            return axiosWithAuth.post("group/protected/setGroupPreference", groupData);
        }
    };

    const askForPreferences = async () => {
        try {
            const response = await requestPreferences()
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
            await submitPreferencesRequest(data);

            // Met correctement a jour les préferences
            getPreferences();
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
