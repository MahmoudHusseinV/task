// @ts-ignore
import { When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { Then } from '@badeball/cypress-cucumber-preprocessor';

import {SearchPage} from "../page-object/search-page";

const searchPage = new SearchPage();

When(/^Navigate to PropertyFinder homePage URL$/, function () {
    searchPage.navigateToHomePage();
});
Given(/^I Select Villas with the search criteria$/, function () {
    searchPage.selectVillasProperty();
});

Then(/^I should be able to see total number of results from the API response matches the total displayed property results\.$/, function () {
searchPage.checkVillasTotalNumber();
});

Given(/^I search for “The Bahrain Bay” location under the search box$/, function () {
searchPage.searchForPropertyByLocation();
});

;Then(/^I should Select the first property from the list and verify the date from date" should not be empty$/, function () {
    searchPage.assertOnDate();
});

Given(/^I Select the search criteria for commercial properties and assert on the data$/, function () {
    searchPage.selectCommercialProperty();
});