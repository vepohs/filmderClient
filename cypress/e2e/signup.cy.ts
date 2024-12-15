describe('Page d\'inscription', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/signup')
    })

    it('Doit afficher le formulaire d\'inscription correctement', () => {

        // Vérifie la présence des champs
        cy.get('#firstName').should('be.visible')
        cy.get('#lastName').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#age').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#confirmPassword').should('be.visible')
        cy.get('.submitBtn').should('be.visible')

        // Vérifie qu'il y a un titre SIGN UP
        cy.contains('SIGN UP').should('exist')
    })

    it('Doit permettre de remplir le formulaire et le soumettre', () => {
        // On remplit chaque champ avec des valeurs de test
        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Dupont')
        cy.get('#email').type('jean.dupont@example.co')
        cy.get('#age').type('30')
        cy.get('#password').type('MonSuperMotDePasse123!')
        cy.get('#confirmPassword').type('MonSuperMotDePasse123!')

        // On clique sur le bouton SIGN UP
        cy.get('.submitBtn').click()

        // Ici tu vérifieras ce qui est supposé se passer après la soumission.
        // Par exemple, si ton site redirige vers /welcome, tu peux faire :
         cy.url().should('include', '/login')

        // Ou vérifier un message de succès :
        // cy.contains('Votre compte a été créé avec succès').should('be.visible')
    })
})
