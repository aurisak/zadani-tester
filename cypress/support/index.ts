declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      hover(value: string): Chainable<JQuery<HTMLElement>>;
      tid(selector: string): Chainable<JQuery<HTMLElement>>;
      visitOnDomain(selector: string): Chainable<JQuery<HTMLElement>>;
      visitCz(selector: string): Chainable<JQuery<HTMLElement>>;
      visitCom(selector: string): Chainable<JQuery<HTMLElement>>;
      visitSk(selector: string): Chainable<JQuery<HTMLElement>>;
      login({
        username,
        password,
        domain,
      }: {
        username: string;
        password: string;
        domain: string;
      }): Chainable<JQuery<HTMLElement>>;
    }
  }
}

import "./commands";
