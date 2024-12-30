import {PreferencesResponse} from "../types/preferences.ts";
import {Genre, Provider} from "../types/genreAndProvider.ts";

export const transformPreferencesToIds = (data: PreferencesResponse) => ({
    genres: data.genrePreference.map((genre: Genre) => genre.id),
    providers: data.providerPreference.map((provider: Provider) => provider.id),
});

export const transformPreferencesToObjects = (data: PreferencesResponse) => ({
    genres: data.genrePreference.map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
    })),
    providers: data.providerPreference.map((provider: Provider) => ({
        id: provider.id,
        name: provider.name,
    })),
});