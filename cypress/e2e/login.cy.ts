import {TEST_USER} from "../support/constants";

describe('Page de connexion', () => {
    beforeEach(() => {
        cy.viewport(430, 932);
        cy.visit('https://filmder.fr/login')

    })

    afterEach(() => {
        cy.wait(3000);
    })

    it('Doit afficher le formulaire de connexion correctement', () => {
        // Vérifie la présence des champs
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('.submitBtnSignIn').should('be.visible')
        cy.contains('Connexion').should('exist')
    })

    it('Connexion echec mail mauvais', () => {
        cy.get('#email').type("TEST_USER@dkd.com")
        cy.get('#password').type("wrongPassword12")
        cy.get('#submitBtnSignIn').click()

    })

    it('Connexion echec mdp', () => {
        cy.get('#email').type(TEST_USER.email)
        cy.get('#password').type("wrongPassword12")
        cy.get('#submitBtnSignIn').click()
    })

    it('Connexion réussie', () => {
        cy.get('#email').type(TEST_USER.email)
        cy.get('#password').type(TEST_USER.password)
        cy.get('#submitBtnSignIn').click()
        cy.url().should('include', '/protected')
    })

});
