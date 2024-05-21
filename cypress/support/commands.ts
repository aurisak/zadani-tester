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

const login = (
  { domain, username, password }: { domain: string; username: string; password: string },
  cy: Cypress.cy & CyEventEmitter
) => {
  switch (domain) {
    case "CZ": {
      cy.visit("/");
      cy.get("button").contains("Přihlásit se").click();
      cy.get("#email").type(username);
      cy.get("#current-password").type(password);
      cy.get(".get-login").within(() => {
        cy.get("button").contains("Přihlásit se").click();
      });
    }
  }
};

Cypress.Commands.add("login", ({ username, password, domain }) => {
  switch (domain) {
    case "CZ": {
      cy.visit("/");
      cy.get("button").contains("Přihlásit se").click();
      cy.get("#email").type(username);
      cy.get("#current-password").type(password);
      cy.get(".get-login").within(() => {
        cy.get("button").contains("Přihlásit se").click();
      });
    }
    case "SK": {
      cy.visit("/");
      cy.get("button").contains("Prihlásiť sa").click();
      cy.get("#email").type(username);
      cy.get("#current-password").type(password);
      cy.get(".get-login").within(() => {
        cy.get("button").contains("Prihlásiť sa").click();
      });
    }
    default:
      throw new Error(`Domain ${domain} is not supported`);
  }
});
