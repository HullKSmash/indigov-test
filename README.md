# inidgov_test

This suite of tests runs on Cypress using Javascript and Chrome browser.  The tests interact with the organization landing page and associated code repositories located at https://www.github.com/indigov-us.

## Setup

To run these tests, first install Cypress using npm:
```
cd /desired/project/location
npm init
npm install cypress --save-dev
```

You will need to have Node.js 16.x/18.x/20.x and a recent version of Chrome.

The full system requirements for Cypress can be found here:
    cy.get('div[id=org-repositories]').find('ul').as('repoList');

## Run With Console
From your project directory, enter
```
npx cypress open
```
Select **E2E Testing** and **Chrome**, then **Start E2E Testing in Chrome**.  This will launch the browser console.  Select **spec.cy.js** to run the full test suite.

## Run Without Console (Terminal Only)
To skip the browser console and only output test results to the terminal, navigate to your project direct and enter 
```
npx cypress run
```
Tests will run and log output to the terminal.

## Exit
Use **ctrl+c** in your terminal to stop Cypress.
