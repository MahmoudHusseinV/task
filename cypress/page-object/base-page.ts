/// <reference types="cypress"/>

/*
    In the framework module, we create a class called BasePage.
    All page object classes will extend the BasePage, thus inheriting all the base methods.
 */
import 'cypress-file-upload';
import { format } from 'date-fns';
const faker = require('faker');

export class BasePage {
  /*locatorType : this should be one of these - 'class' , 'id', 'name' , 'text' , 'title'
   * attributeValue : is the value of locator
   */
  clickOnLink(locator: string) {
    try {
      cy.get(locator).then(($el): void => {
        if ($el.attr('target')) {
          cy.get(locator).first().invoke('removeAttr', 'target').click();
        } else {
          cy.get(locator).click();
        }
      });
    } catch (err) {
      cy.log(err.message);
    }
  }
  navigateToHomePage()
  {
    cy.visit('https://www.propertyfinder.bh/');
  }

  clickElement(locator: string) {
    try {
      cy.get(locator).should('be.visible').click({ force: true });
    } catch (err) {
      cy.log(err.message);
    }
  }

  verifyUrl(urlText: string) {
    try {
      cy.url().should('contain', urlText);
    } catch (err) {
      cy.log(err.message);
    }
  }

  shouldBeVisible(locator: string) {
    cy.get(locator).should('be.visible');
  }

  getButton(buttonName) {
    return cy.get('button:contains("' + buttonName + '")');
  }

  uploadFile(locator: string, fileName: string) {
    cy.wait(1000);
    cy.fixture(fileName).then((fileContent) => {
      cy.get(locator).attachFile({
        fileContent: fileContent.toString(),
        fileName: fileName,
        mimeType: 'image/jpg',
      });
    });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  selectValueFromDropDown(locator: string, text: string, locator2: string) {
    cy.get(locator).type(text);
    cy.get(locator2).click();
  }

  verifyLabel(locator: string, text: string) {
    cy.get(locator).should('contain', text);
  }

  static getResponsiveFlag() {
    return Cypress.env('isResponsive');
  }

  verifyTheActualAndExpectedValidationMessagesAreTheSame(
    expectedValidationMSG,
    actualValidationMSG,
  ) {
    expect(expectedValidationMSG.toString()).equal(
      actualValidationMSG.toString(),
    );
    actualValidationMSG.splice(0, actualValidationMSG.length);
    expectedValidationMSG.splice(0, expectedValidationMSG.length);
  }

  convertApiResponse(){
    const cheerio = require('cheerio'); // Import the cheerio library
// Assuming your API response containing HTML is stored in the variable 'apiHtmlResponse'
    const apiHtmlResponse = `
  <div>
    <h1>Hello, World!</h1>
    <p>This is some content.</p>
  </div>
`;

// Parse the HTML response using cheerio
    const $ = cheerio.load(apiHtmlResponse);

// Extract data by selecting elements using CSS selectors
    const title = $('h1').text();
    const paragraph = $('p').text();

// Create a JSON object with the extracted data
    const jsonData = {
      title,
      paragraph,
    };

    console.log(jsonData); // This will print the JSON data extracted from the HTML
  }


  assertCountries(locator: string, expected: string) {
    cy.fixture('countries').then((countriesData) => {
      cy.get(locator)
        .invoke('text')
        .should('equal', countriesData.englishCountries[expected]);
    });
  }

  selectDropdDownValue(locator1: string, locator2: string, value: string) {
    cy.get(locator1).find(locator2).contains(value).click();
  }

  navigateToPdpForProduct(productName, variantID: string, supplierID: string) {
    let productNameInURL = productName
      .replaceAll('-', ' ')
      .replaceAll(/\s+/g, '-');
    cy.visit(
      '/en/product-details/' +
        productNameInURL.toLowerCase() +
        '-' +
        variantID +
        '-' +
        supplierID,
    );
  }


  /* This function is to click on submit button */
  clickOnSubmitButton() {
    cy.get('button[type="submit"]').click();
  }

  /* This function is to verify text in table column */
  verifyValueInTable(colNum: number, text: string) {
    cy.get('tbody tr')
      .first()
      .each((tableRow) => {
        cy.wrap(tableRow).find('td').eq(colNum).contains(text);
      });
  }

  static createRandomEmailAddress() {

  }
  static createDomesticPhoneNumber() {
    let domesticPhoneNumber: string;
    domesticPhoneNumber = faker.phone.phoneNumber('5########');
    //This code is to change the second digit in the phone number to be even.
    let arr: string[];
    arr = domesticPhoneNumber.split('');
    // @ts-ignore
    if (arr[1] % 2 !== 0) {
      let changedNumber = Number(arr[1]) - 1;
      domesticPhoneNumber = domesticPhoneNumber.replace(
        /^5\d/g,
        '5' + changedNumber.toString(),
      );
    }
    return domesticPhoneNumber;
  }

  static createInternationalEgyptianPhoneNumber() {
    let internationalPhoneNumber: string;
    internationalPhoneNumber = faker.phone.phoneNumber('12########');
    return internationalPhoneNumber;
  }

  static createRandomFirstName() {
    return faker.name.firstName();
  }

  static createRandomLastName() {
    return faker.name.lastName();
  }

  static createRandomCompany() {
    return faker.company.companyName();
  }

  static createRandomPassword() {
    return faker.random.alpha(5) + faker.random.number(99999);
  }
}
