Cypress.Commands.add("visitOnDomain", (args, domain = Cypress.env("currentDomain")) => {
  const customVisitCommand = `visit${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
  cy[customVisitCommand](args);
});

Cypress.Commands.add("visitCz", (args) => {
  cy.visit(`https://dev.fakturaonline.cz${args}`);
});

Cypress.Commands.add("visitCom", (args) => {
  cy.visit(`https://dev.invoiceonline.com${args}`);
});

Cypress.Commands.add("visitSk", (args) => {
  cy.visit(`https://dev.fakturaonline.sk${args}`);
});

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit('/')
  cy.get("button").contains("Přihlásit se").click();
  cy.get("#email").type(username);
  cy.get("#current-password").type(password);
  cy.get(".get-login").within(() => {
    cy.get("button").contains("Přihlásit se").click();
  });
});
