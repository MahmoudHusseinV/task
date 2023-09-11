
# PropertyFinder Task

This project is a sample README that provides instructions for setting up Cypress, understanding Mocha reports, and explains the GitHub workflow for opening a PR.

## Table of Contents
- [Installation](#installation)
- [Running Cypress](#running-cypress)
- [Understanding Mocha Reports](#understanding-mocha-reports)
- [GitHub Workflow for Opening a PR](#github-workflow-for-opening-a-pr)

## Installation

To get started with this project, you'll need to install the required dependencies. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) installed.

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   npm install
   npx cypress open

# Cypress uses Mocha as its test runner

you can generate various types of reports, including HTML reports, using Mocha reporters.

By default, Cypress generates JSON reports, but you can convert them to HTML reports using tools like Mochawesome and cypress-mochawesome-reporter.

To generate an HTML report, run the following commands:

bash
Copy code
# Install Mochawesome and cypress-mochawesome-reporter as development dependencies
npm install mochawesome cypress-mochawesome-reporter --save-dev

# Run your Cypress tests with the reporter option
npx cypress run --reporter mochawesome

# Open the generated HTML report
npx open dist/mochawesome-report/mochawesome.html


Fork this repository to your GitHub account.

Clone your forked repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/your-repo.git
Create a new branch for your changes:

bash
Copy code
git checkout -b feature/your-feature-name
Make and commit your changes.

Push your changes to your forked repository:

bash
Copy code
git push origin feature/your-feature-name
Open a pull request from your branch to the original repository.

The GitHub Actions workflow will automatically run tests on your changes.

Reviewers will provide feedback, and once your changes are approved, they can be merged into the main branch.
# Web Automation Guidelines


## Run Project from Terminal

#### To execute e2e tests for specific environment

- `yarn install`
- Run: `npx cypress run`

#### To record test run and view in Cypress dashboard

- `npx cypress run --record --key a5b91ee9-da30-4053-8bc3-fae4726d6b30`


#### To execute using specific browser

- `npx cypress run --browser chrome`

#### To execute in responsive view

- `npx cypress open --env isResponsive=true,device='iphone-xr' --config-file cypress-mobile.json`


#### Configure Test Retries

The number of test retries, always can change from Cypress.json

- Set number of test retries for cypress run to be 1 attempts
- Set number of test retries for cypress open to be 1 attempt

#### To execute smoke tests

- `npx cypress run tags='@smoke'`

#### To execute any cucumber feature tags

- `npx cypress run tags='@feature-tag-name'`
- `npx cypress run tags='@feature-tag-name1 @feature-tag-name2'`

#### To generate HTML Test Report

- `npm run test`

For more information about the Command Line, [click here](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)

## Deploy and Pull Request Process

- Pull the recent version from develop `git pull origin develop`
- Resolve conflict if exist and commit new changes `git commit`
- Add your new changes local `git add .`
- Commit your changes local `git commit -m "fix: PROJ-123 add a README file to the project."`
- Run your new script and ensure everything is Ok
- Create temp branch `git checkout -b add-README-file`
- Push your committed changes remotely `git push origin add-README-file`
- Open pull request on develop branch with extensive description
- Add link for each Jira Test Case which implemented as automated scenario
- Update test case's automation status to be "Automated"
- Make sure the test case written in BDD format
- Change label from 'In Progress' to 'Review Needed'
- Request Code Review once PR ready for review with screenshots
- Resolve all comments/conversations sent by teammates on PR
- Delete temp branch after merge `git branch -D add-README-file`
- 

## Manual test Cases
1-Check the total displayed number of results for category Villas with price range more than or equal to 300,000 AED / yearly

-Open the Property Finder.bh website.
-Select "Villas" from property type drop down.
-Click on the price field and Filter the price range to a maximum of 300,000 AED.
-open the network
-click on search button
-Check the total number of results displayed on the page.
Expected : 
-the total number of results from the API response should be matching with the total displayed property results on the page.

Scenario 2: Click on commercial properties only checkbox and select "offices"

-Open the Property Finder.bh website.
-Select the "show commercial properties only" checkbox.
-Click on the search icon.
-From the commercial properties list displayed, click on the "offices" category.
-open the network to see the request to the API for the same filter criteria.
-Check the total number of results displayed on the website.
-the total number of results from the API response should match the total displayed property results on the page.
-Click on the first property in the search results.
-Check the properties displayed for the first property 
Expected :

Verify that the price, description, location, size, title, and number of bathrooms match the details provided in the API response.

Scenario 3: check the option of Search for property by location

-Open the Property Finder.bh website.
-enter "The Bahrain Bay" into the search box.
-Select the first location from the search results that matches the searched text.
-Click on the search icon.
-click on the first property from the list.
Expected :
-"Available from date" for the selected property should not be empty in the property details.


Scenario 4:
-Select a different location from the search results and verify that the selected property matches the chosen location.
-Try searching for a location that doesn't exist and ensure that no results are displayed.
-Search for a location with special characters and verify that the search results handle special characters correctly.
-Test the search with multiple locations and verify that the results are displayed accurately.


## Improvements : 
1. Enhance the steps included in each scenario 
2. Decouple the code and make it more standalone functions to be reusable
3. Enhance the naming conventions.
4. Add the remaining asserstions for scenario 2 

## All the test are run : 
<img width="1678" alt="Screenshot 2023-09-11 at 11 20 31 PM" src="https://github.com/MahmoudHusseinV/task/assets/62815273/c29a4bfd-b611-4cd2-814c-0baafeef7481">
