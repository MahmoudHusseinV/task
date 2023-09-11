@Task
Feature: As a user i should be able to search on any property and see the result

  Background:
    When Navigate to PropertyFinder homePage URL

  Scenario: Check the total displayed number of results for category Villas with price range more than or equal to 300,000 AED / yearly
    Given I Select Villas with the search criteria
    Then I should be able to see total number of results from the API response matches the total displayed property results.

  Scenario: Verify property Details
     Given I Select the search criteria for commercial properties and assert on the data

  Scenario: Verify Search for property by location
    Given I search for “The Bahrain Bay” location under the search box
    Then I should Select the first property from the list and verify the date from date" should not be empty


