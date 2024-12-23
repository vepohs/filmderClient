import {TEST_USER} from "../support/constants";

describe('Page d\'inscription', () => {

    beforeEach(() => {
        cy.viewport(430, 932);
        cy.visit('https://filmder.fr/signup')
    })

    afterEach(() => {
        cy.wait(5000);
    })

    it('Vérif affichage correct', () => {

        cy.get('#firstName').should('be.visible')
        cy.get('#lastName').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#age').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#confirmPassword').should('be.visible')
        cy.get('#submitBtn').should('be.visible')
    })

    it('Mdp non similaire', () => {
        const emailUnique = `testuser${Date.now()}@example.com`;

        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Dupont')
        cy.get('#email').type(emailUnique)
        cy.get('#age').type('30')
        cy.get('#password').type("Password123!")
        cy.get('#confirmPassword').type("DifferentPassword!123")

        cy.get('#submitBtn').click()

        cy.get('.warning').should('be.visible');
        cy.get('#confirmPassword')
            .parent()
            .should('have.class', 'wrongInput');
    })

    it('Champ vides', () => {
        cy.get('#submitBtn').click();

        cy.get('#firstName')
            .parent()
            .should('have.class', 'wrongInput');

        cy.get('#lastName')
            .parent()
            .should('have.class', 'wrongInput');

        cy.get('#email')
            .parent()
            .should('have.class', 'wrongInput');

        cy.get('#age')
            .parent()
            .should('have.class', 'wrongInput');

        cy.get('#password')
            .parent()
            .should('have.class', 'wrongInput');

        cy.get('#confirmPassword')
            .parent()
            .should('have.class', 'wrongInput');
    });


    it('email deja utilisé', () => {
        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Dupont')
        cy.get('#email').type(TEST_USER.email)
        cy.get('#age').type('30')
        cy.get('#password').type(TEST_USER.password)
        cy.get('#confirmPassword').type(TEST_USER.password)

        cy.get('#submitBtn').click()

        cy.get('.warning').should('be.visible');
        cy.get('#email')
            .parent()
            .should('have.class', 'wrongInput');

    })

    it('Création user avec des champs valides', () => {
        const emailUnique = `testuser${Date.now()}@example.com`;
        cy.get('#firstName').type('Jean');
        cy.get('#lastName').type('Dupont');
        cy.get('#email').type(emailUnique);
        cy.get('#age').type('30');
        cy.get('#password').type('Password123!');
        cy.get('#confirmPassword').type('Password123!');
        cy.get('#submitBtn').click();

        cy.url().should('include', '/login');
    });

})
