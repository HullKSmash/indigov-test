var orgName = 'Indigov';
var expectedTotalRepos = '17';
var expectedTsRepos = '5';
var repoNames = [];
var sortedRepoNames = [];

describe('test github repos', () => {
  it('should visit Indigov landing page', () => {
    cy.get('main').find('header').find('h1').should('contain.text', orgName);
  })

  it('contains the expected number of repos', () => {
    cy.get('a[href="/orgs/indigov-us/repositories"]').find('span[data-view-component=true]').should('contain.text', expectedTotalRepos);
  })

  it('contains the expected number of TypeScript repos', () => {
    cy.get('summary[role=button]').contains('Language').click();
    cy.get('span[data-menu-button-text]').contains('TypeScript').click();
    cy.get('div[id=org-repositories]').find('div').contains('results').should('contain.text', expectedTsRepos);
  })
  
  it('sorts the repos by name, descending', () => {
    cy.get('summary[role=button]').contains('Sort').click();
    cy.get('span[data-menu-button-text]').contains('Name').click();
    cy.wait(1000);

    cy.get('div[id=org-repositories]').find('ul').as('repoList');
 
    cy.get('@repoList').find('li').find('a[data-hovercard-type=repository]').each((a) => {
      repoNames.push(a.text().trim());
      sortedRepoNames.push(a.text().trim());
    }).then( () => {
      expect(repoNames).to.deep.equal(sortedRepoNames.sort());
    });
  })

  it('shows the correct clone link for the last sorted repo', () => {
    cy.get('div[id=org-repositories]').find('ul').as('repoList');
    cy.get('@repoList').find('a[data-hovercard-type=repository]').last().as('lastRepo');
   
    cy.get('@lastRepo').then($lastRepo => {
      const lastRepoName = $lastRepo.text().trim();
      cy.wrap(lastRepoName).as('lastRepoName');
    })
    cy.get('@lastRepo').click();

    cy.get('get-repo').click();
    cy.get('button').contains('HTTPS');
    cy.get('@lastRepoName').then(lastRepoName => {
      cy.get('div[role=tabpanel]').find('clipboard-copy').should('have.value', `https://github.com/indigov-us/${lastRepoName}.git`);
    })
  })
})

