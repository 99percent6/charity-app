// https://docs.cypress.io/api/introduction/api.html

describe('Main Page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('span', 'Create organizaiton');
  });
});

describe('Organization', () => {
  const orgName = 'Microsoft';
  it('Create organization', () => {
    cy.createOrganization(orgName);
  });

  it('Edit organization', () => {
    const newOrgName = 'Google';
    cy.createOrganization(orgName);
    cy.get('#edit-org-button').click()
    cy.get('#edit-org-input').clear().type(newOrgName);
    cy.get('#edit-org-button-modal').click();
    cy.wait(1000);
    cy.get('li').contains(newOrgName);
  })

  it('Donate', () => {
    const donationAmount = '199'
    cy.createOrganization(orgName);
    cy.get('#donate-org-button').click()
    cy.get('#donate-org-input').clear().type(donationAmount);
    cy.get('#donate-org-button-modal').click();
    cy.wait(1000);
    cy.get('strong').contains(`Donation amount - $${donationAmount}`);
  })
});
