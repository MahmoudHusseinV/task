import {BasePage} from "./base-page";
import 'cypress-wait-until';


const locators: Record<string, string> = {
    searchBar:'button.multi-selection-autocomplete__root',
    propertyType: ' div.filter-form-component-variant__row.filter-form-component-variant__row-3 > div.dd.dd--enabled.filter-form-component-variant__sm-hide.data-filter-type-filter\\[propertyTypeId\\] > div',
    vilaProperty:'.dd__body .dropdown-list__item-content',
    price:' div.price-selector.filter-form-component-variant__sm-hide.data-filter-type-filter\\[min_price\\]\\|filter\\[max_price\\] > div > div',
    maxPrice:'div.dropdown-wrapper__content div:nth-child(3)',
    searchButton:'.button-2.filter-form-component-variant__sm-hide',
    rent:'.filter-form-component-variant__category-selector > :nth-child(2)',
    monthly: '.chip-choice__item > .text > span',
    searchResult:'.styles_container__KcjEg > span',

    showCommercialOnlyCheckBox:'span.checkbox-component__box',
    searchIcon:'.button-primary.filter-form-search-button.filter-form-component-variant__sm-hide',
    offices:'#root_element > main > div.styles_desktop_aggregation-links__bV5c5 > ul > li:nth-child(3) > a',
    commercialSearchResults:'div.styles_container__KcjEg > span',
    firstSearchResult:'#root_element > main > ul > li > article > a',


    bathrooms:':nth-child(3) > .property-facts__value',
    size:'ul > li:nth-child(2) > div.property-facts__value',
    location: 'body > main > div > div:nth-child(1) > div > div.property-page__column > div.property-page__column--left > div:nth-child(3) > div > div.property-location > div',
    title:'div.panel.panel--style1.panel--style3 > h1',
    commercialPropertyType:'ul > li:nth-child(1) > div.property-facts__value',
    description:'body > main > div > div:nth-child(1) > div > div.property-page__column > div.property-page__column--left > div:nth-child(4) > div.property-page__description > div.text-trim.property-description__text-trim.text-trim--enabled',
    propertyPrice:'.data-testid="property-card-price"',
    bahrainBay:'.multi-selection-autocomplete__suggestion-text',
    availableDate:':nth-child(5) > div.property-facts__value',
};

    export class SearchPage extends BasePage {

        selectVillasProperty(){
            cy.get(locators.rent).click();
            cy.get(locators.propertyType).click();
            cy.get(locators.vilaProperty).contains('Villa').click();
        }

        checkVillasTotalNumber() {
            cy.get(locators.price).click();
            cy.get(locators.maxPrice).click();
            cy.get(locators.monthly).click();
            cy.get(locators.maxPrice).type('25000').click();
            cy.intercept('GET', 'https://www.propertyfinder.bh/en/search?c=2&fu=0&ob=mr&page=1&pt=25000&rp=m&t=35')
                .as('apiRequest');
            cy.get(locators.searchButton).click();

            cy.wait('@apiRequest').then((interception) => {
                const responseBody = interception.response.body
                const $html = Cypress.$(responseBody); // Cypress.$ is an alias for jQuery
                const content = $html.find('.styles_container__KcjEg span[aria-label="Search results count"]').text();
                cy.get(locators.searchResult)
                    .should('be.visible', {timeout: 10000})
                    .invoke('text')
                    .then((text) => {
                        expect(content).to.equal(text);
                    });
            });
        }

        selectCommercialProperty() {
            cy.intercept('GET', 'https://www.propertyfinder.bh/_next/data/28cLQ2qzHoVye0kbkifJi/en/search.json?c=3&t=4&fu=0&ob=mr')
                .as('apiCall');

            cy.get(locators.showCommercialOnlyCheckBox).click();
            cy.get(locators.searchIcon).click();
            cy.get(locators.offices).click({force:true});


            cy.intercept('GET', 'https://www.propertyfinder.bh/en/plp/**/*').as('networkRequest');
            cy.get(locators.firstSearchResult).click({ force: true });
            cy.wait('@networkRequest').then((interception) => {
                const responseBody = interception.response.body
                const $html = Cypress.$(responseBody); // Cypress.$ is an alias for jQuery
                const description = $html.find('div[data-qs="text-trimmer"]').text();
                const location = $html.find('div.property-location__area[data-qs="map_placeholder"]').text();

                cy.get(locators.description)
                    .should('be.visible', {timeout: 10000})
                    .invoke('text')
                    .then((text) => {

                        expect(description).to.equal(text);
                    });

                cy.get(locators.location)
                    .should('be.visible', {timeout: 10000})
                    .invoke('text')
                    .then((text) => {
                        expect(location).to.equal(text);
                    });
            });

        }



        searchForPropertyByLocation() {
            cy.get(locators.searchBar).first().type('bahrain bay');
            cy.get(locators.bahrainBay).click();
            cy.get(locators.searchButton).click();
            cy.get(locators.firstSearchResult).first().click({force: true});
            cy.get(locators.availableDate);

        }

        assertOnDate(){
            cy.get(locators.availableDate).invoke('text')
                .should('not.be.empty');
        }

    }
