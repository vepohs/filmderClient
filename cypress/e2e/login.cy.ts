describe('Page de connexion', () => {
    beforeEach(() => {
        // Navigue vers la page de connexion avant chaque test
        cy.visit('http://localhost:5173/login')
    })

    it('Doit afficher le formulaire de connexion correctement', () => {
        // Vérifie la présence des champs
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('.submitBtnSignIn').should('be.visible')

        // Vérifie qu'il y a un titre "Connexion"
        cy.contains('Connexion').should('exist')
    })

    it('Doit permettre de remplir le formulaire et de se connecter', () => {
        // Remplit le formulaire avec les informations d'inscription
        cy.get('#email').type('jean.dupont@example.co')
        cy.get('#password').type('MonSuperMotDePasse123!')

        // Clique sur le bouton "Se connecter"
        cy.get('.submitBtnSignIn').click()

        // Vérifie le comportement après la connexion
        // Par exemple, redirection vers une page d'accueil utilisateur
        cy.url().should('include', '/protected') // Remplace "/dashboard" par la page correcte

    })
});
