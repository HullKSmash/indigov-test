const repositorySelector = 'a[href="/orgs/indigov-us/repositories"]';
const repositoryCountSelector = 'span[data-view-component=true]';

const orgRepositoriesListSelector = 'div[id=org-repositories]';
const repoFilterDropdownSelector = 'summary[role=button]';
const repoFilterItemSelector = 'span[data-menu-button-text]';
const orgRepositoriesNameSelector = 'a[data-hovercard-type=repository]';

const orgName = 'Indigov';
const expectedTotalRepos = '17';
const expectedTsRepos = '5';
var repoNames = [];
var sortedRepoNames = [];

describe('Github Landing Page and Total Repos', () => {
  it('should visit Indigov landing page', () => {
    cy.get('main').find('header').find('h1').should('contain.text', orgName);
  });

  it('contains the expected number of repos', () => {
    cy.get(repositorySelector).find(repositoryCountSelector).should('contain.text', expectedTotalRepos);
  });
});

describe('Sort and Filter Repos', () => {
  beforeEach(() => {
    cy.get(orgRepositoriesListSelector).find('ul').as('repoList');
    cy.get(repoFilterDropdownSelector).contains('Language').click();
    cy.get(repoFilterItemSelector).contains('TypeScript').click();
    cy.get(repoFilterDropdownSelector).contains('Sort').click();
    cy.get(repoFilterItemSelector).contains('Name').click();
  });

  it('contains the expected number of TypeScript repos', () => {
    cy.get(orgRepositoriesListSelector).find('div').contains('results').should('contain.text', expectedTsRepos);
  });
  
  it('sorts the TS repos by name, descending', () => {
    //Have to wait for list to re-render after sort.  Cypress does this implicitly on 
    //a new page redirect, but not for this type of click.  The list is available 
    //in the DOM the entire time, so waiting on elements to be available also does not work.
    cy.wait(500);  
 
    cy.get('@repoList').find(orgRepositoriesNameSelector).each((a) => {
      repoNames.push(a.text().trim());
      sortedRepoNames.push(a.text().trim());
    }).then( () => {
      expect(repoNames).to.deep.equal(sortedRepoNames.sort());
    });
  });

  it('shows the correct clone link for the last sorted repo', () => {
    //Have to wait for list to re-render after sort.  Cypress does this implicitly on 
    //a new page redirect, but not for this type of click.  The list is available 
    //in the DOM the entire time, so waiting on elements to be available also does not work.
    cy.wait(500);
    cy.get('@repoList').find(orgRepositoriesNameSelector).last().as('lastRepo')
      .then($lastRepo => {
        //Store the name of the last repo for link verification before clicking on it
      const lastRepoName = $lastRepo.text().trim();
      cy.wrap(lastRepoName).as('lastRepoName');
    });

    cy.get('@lastRepo').click();
    cy.get('get-repo').click();
    cy.get('button').contains('HTTPS');

    cy.get('@lastRepoName').then(lastRepoName => {
      cy.get('div[role=tabpanel]').find('clipboard-copy').should('have.value', `https://github.com/indigov-us/${lastRepoName}.git`);
    });
  });
});