import {TEST_USER} from "../support/constants";

describe('Page de préférences', () => {
    const genres = [
        "Aventure", "Fantastique", "Animation", "Drame", "Horreur", "Action",
        "Comédie", "Histoire", "Western", "Thriller", "Crime", "Documentaire",
        "Science-Fiction", "Mystère", "Musique", "Romance", "Familial", "Guerre", "Téléfilm"
    ];

    const providers = [
        "Apple TV", "Google Play Movies", "Netflix", "Rakuten TV", "Amazon Prime Video",
        "YouTube Premium", "Be TV Go", "VRT MAX", "Disney Plus", "Apple TV Plus"
    ];

    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#email').type(TEST_USER.email)
        cy.get('#password').type(TEST_USER.password)
        cy.get('#submitBtnSignIn').click()
        cy.url().should('include', '/protected')
    });

    it('Aucune préférences selectionné', () => {
        cy.get("#svgParams").click()
        cy.get('.PreferencesGlobal').should('be.visible');
        cy.contains('Genres').should('exist');
        cy.contains('Providers').should('exist');

        // Sélectionne 3 genres aléatoires
        const randomGenres = getRandomItems(genres, 3);
        randomGenres.forEach((genre) => {
            cy.get('.genreButton').contains(genre).click();
        });

        // Sélectionne 3 providers aléatoires
        const randomProviders = getRandomItems(providers, 3);
        randomProviders.forEach((provider) => {
            cy.get('.providerButton').contains(provider).click();
        });

        // Clique sur le bouton "Enregistrer les préférences"
        cy.get('.submitButton').click();

        // Vérifie qu'un toast de confirmation apparaît (par exemple : "Préférences enregistrées")
        cy.contains('Préférences enregistrées').should('be.visible');
    });


    it('Doit permettre de sélectionner des genres, des providers et enregistrer les préférences', () => {
        cy.get("#svgParams").click()
        cy.get('.PreferencesGlobal').should('be.visible');
        cy.contains('Genres').should('exist');
        cy.contains('Providers').should('exist');

        // Sélectionne 3 genres aléatoires
        const randomGenres = getRandomItems(genres, 3);
        randomGenres.forEach((genre) => {
            cy.get('.genreButton').contains(genre).click();
        });

        // Sélectionne 3 providers aléatoires
        const randomProviders = getRandomItems(providers, 3);
        randomProviders.forEach((provider) => {
            cy.get('.providerButton').contains(provider).click();
        });

        // Clique sur le bouton "Enregistrer les préférences"
        cy.get('.submitButton').click();

        // Vérifie qu'un toast de confirmation apparaît (par exemple : "Préférences enregistrées")
        cy.contains('Préférences enregistrées').should('be.visible');
    });
});
