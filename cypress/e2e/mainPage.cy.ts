describe('Main Page - filmder', () => {

    //
    // AVANT CHAQUE TEST
    //
    beforeEach(() => {
        // Adapte l’URL si ta route de la main page est différente
        cy.visit('http://localhost:5173/protected')
    })

    //
    // 1) Vérification du rendu général
    //
    it('Doit afficher la page principale correctement', () => {
        // HEADER
        cy.get('.headerPrefer').should('be.visible')
        cy.get('.svgFilmder')  // l'icône Filmder
            .should('be.visible')

        // LOGOUT
        cy.get('.svgLogout')
            .should('be.visible')

        // MIDDLE (zone des cartes de films)
        cy.get('.middleMainPage').should('be.visible')
        cy.get('.imageContainer').should('be.visible')

        // FOOTER
        cy.get('.footerPrefer').should('be.visible')

        // Vérifie que le menu customComboBox et la zone d'action de groupes existent
        cy.get('.customComboBox').should('exist')
        cy.get('.action-buttons').should('exist')
    })

    //
    // 2) Vérification de l’affichage d’un film et de ses détails
    //
    it('Doit afficher les informations du film', () => {
        // Titre, durée, date de sortie, votes, note moyenne, synopsis, providers
        cy.get('.detailContainer').within(() => {
            cy.get('.title').should('be.visible')
            cy.get('.duration').should('be.visible')
            cy.get('.releaseDate').should('be.visible')
            cy.get('.votes').should('be.visible')
            cy.get('.averageGrade').should('be.visible')
            cy.get('.synopsisContainer').should('be.visible')
            cy.get('.providersContainer').should('be.visible')
        })
    })

    //
    // 3) Tester les interactions de Like / Dislike / Voir
    //
    it('Doit pouvoir liker, disliker et voir la bande-annonce', () => {
        // LIKE
        cy.get('.svgLike').click()
        // Ici, tu peux vérifier un comportement précis après le clic (toast de succès, nouvelle carte, etc.)
        // Par exemple, si tu affiches un toast :
        // cy.contains('Film ajouté aux favoris').should('be.visible')

        // DISLIKE
        cy.get('.svgDislike').click()
        // Vérifier le comportement après dislike
        // cy.contains('Film marqué comme non aimé').should('be.visible')

        // VOIR (bande-annonce) – seulement si le film a une vidéo
        // Vérifie que .svgEye est présent (ou non) :
        cy.get('body').then(($body) => {
            if ($body.find('.svgEye').length > 0) {
                // S’il y a un svgEye, on clique pour lancer la vidéo
                cy.get('.svgEye').click()
                // Vérifie que la vidéo s'affiche
                cy.get('.videoContainer').should('be.visible')

                // Eventuellement, refermer la vidéo (si tu as un mécanisme pour fermer)
                // ...
            } else {
                // Pas de bande-annonce pour ce film
                cy.log('Pas de trailer disponible pour ce film.')
            }
        })
    })

    //
    // 4) Tester le drag sur la carte (swipe)
    //
    it('Doit pouvoir swiper (drag) une carte pour évaluer', () => {
        // Sélectionne la première carte et simule un drag & drop
        cy.get('.cardContainer').first().trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: 300, clientY: 0 })
            .trigger('mouseup', { force: true })

        // Là aussi, tu vérifies le comportement attendu (comme un nouveau film qui arrive, un toast, etc.)
        // ...
    })

    //
    // 5) Tester la gestion de groupes (ouverture du dropdown, changement de groupe, etc.)
    //
    it('Doit pouvoir ouvrir le menu de groupes et en sélectionner un', () => {
        // Ouvre le dropdown
        cy.get('.selectedGroup').click()
        cy.get('.dropdownIcon').should('contain', '▲') // Indique que le menu est ouvert

        // Sélectionne le groupe "Moi" s’il est présent
        // (ou un autre groupe défini dans ton mock)
        cy.contains('li.groupItem', 'Moi').click()

        // Vérifie que le menu s’est refermé
        cy.get('.dropdownIcon').should('contain', '▼')

        // Vérifie que le titre ou l’icône reflète le nouveau groupe sélectionné
        cy.get('.selectedGroup').within(() => {
            cy.contains('Moi').should('exist')
        })
    })

    //
    // 6) Tester la création / join d’un groupe via le popup
    //
    it('Doit pouvoir créer un nouveau groupe', () => {
        // Ouvre la popup "create"
        cy.get('.SvgGroupAdd').click()
        // Vérifie que la popup est visible
        cy.get('.popup-overlay').should('be.visible')

        // Remplit le champ
        cy.get('.popup-content input')
            .type('NouveauGroupeTest')

        // Clique sur Create
        cy.get('.popup-actions .submit').click()

        // Vérifie un éventuel message de confirmation ou changement d’UI
        // cy.contains('Groupe "NouveauGroupeTest" créé avec succès').should('be.visible')

        // Ferme la popup si elle ne se ferme pas automatiquement
        // ...
    })

    //
    // 7) Tester la déconnexion
    //
    it('Doit pouvoir se déconnecter', () => {
        cy.get('.svgLogout').click()

        // Vérifie la redirection vers la page de login
        // Adapte '/login' selon ta config
        cy.url().should('include', '/login')
    })

})
