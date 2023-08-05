# inidgov_test

This suite of tests runs on Cypress using Javascript and Chrome browser.  The tests interact with the organization landing page and associated code repositories located at https://www.github.com/indigov-us.

More notes on my testing approach, tool choice, and possible future improvements can be found in the testing-notes.md file.

## Setup

Clone the indigov-test repository into your folder of choice.  Then, install Cypress using npm from your indigov-test folder home:
```
npm init
npm install cypress --save-dev
```

You will need to have Node.js 16.x/18.x/20.x and a recent version of Chrome.

The full system requirements for Cypress can be found here:
https://docs.cypress.io/guides/getting-started/installing-cypress

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
