import * as contactsOverview from "../support/pageObjects/contactsOverview";
import * as invoiceForm from "../support/pageObjects/invoiceForm";
import * as tables from "../support/pageObjects/tables";

const username = Cypress.env('testUser');
const password = Cypress.env('testUserPassword');

interface UserContact {
  name: string;
  ico: number;
  email: string;
  city: string;
  PSC: number;
}

describe("Contact page", () => {
  beforeEach(() => {
    cy.login(username, password);
  });

  after(() => {
    tables.removeContact();
    tables.removeContact();
    tables.removeInovice();
  });

  it("should create new contact", () => {
    cy.get(".navbar__content").within(() => {
      cy.get(".navbar-navigation__item").contains("Kontakty").click();
    });
    cy.get(".empty-message")
      .contains("Zatím nemáte žádné kontakty, ale jakmile nějaký vytvoříte, najdete ho na této stránce.")
      .should("be.visible");
    cy.intercept("POST", "**contacts**").as("createContact");
    cy.intercept("GET", "/api/contacts/**").as("getContacts");

    contactsOverview.createContact();
    cy.wait("@createContact");
    cy.wait("@getContacts");
    cy.fixture<UserContact>("userContact.json").then((userContact) => {
      tables.checkRowValuesTable(userContact.name, userContact.ico, userContact.email, 0);
    });
  });

  it("should create invoice from contacts table", () => {
    cy.get(".navbar__content").within(() => {
      cy.get(".navbar-navigation__item").contains("Kontakty").click();
    });
    cy.fixture<UserContact>("userContact.json").then((userContact) => {
      tables.createInvoiceFromContactTable(userContact.name);
      cy.intercept("POST", "**reports").as("createInvoice");
      invoiceForm.createInvoice();
      cy.wait("@createInvoice");
      cy.get(".navbar__content").within(() => {
        cy.get(".navbar-navigation__item").contains("Kontakty").click();
      });
      cy.fixture<UserContact>("userContact.json").then((userContact) => {
        tables.checkRowValuesTable(userContact.name, userContact.ico, userContact.email, 1);
      });
      contactsOverview.checkContactSummaryMessage("Vystavili jste již celkem 1 faktur v celkové hodnotě 4 999 Kč");
    });
  });

  it("should edit contact from contacts table", () => {
    cy.get(".navbar__content").within(() => {
      cy.get(".navbar-navigation__item").contains("Kontakty").click();
    });
    contactsOverview.editContact("Edit Jana Kantoj");
  });

  it("should sort contacts in table", () => {
    cy.get(".navbar__content").within(() => {
      cy.get(".navbar-navigation__item").contains("Kontakty").click();
    });
    contactsOverview.createRandomContact();
    tables.sortDataInTabelDescending();
  });
});
