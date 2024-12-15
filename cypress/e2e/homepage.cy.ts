
describe("Homepage Tests", () => {
    it("should load the homepage", () => {
        cy.visit("/"); // Accède à la page d'accueil
        cy.contains("Connexion").should("be.visible"); // Vérifie qu'un texte clé est visible
    });
});
