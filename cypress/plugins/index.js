/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const fs = require('fs');
const glob = require('glob');

const browserify =
  require('@badeball/cypress-cucumber-preprocessor/browserify').default;
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    browserify(config, {
      typescript: require.resolve('typescript'),
    }),
  );
   //Delete file task
   on('task', {
    async deleteFile(filePath2) {
      return new Promise((resolve, reject) => {
        glob(filePath2, async (err, files) => {
          if (err) {
            reject(err);
          } else {
            for (const file of files) {
              try {
                await fs.promises.unlink(file);
              } catch (err) {
                reject(err);
              }
            }
            resolve(null);
          }
        });
      });
    }
  });
  on('task', {
    listDownloads: (dirPath) => {
      const files = fs.readdirSync(dirPath)
      return files.filter(file => fs.statSync(`${dirPath}/${file}`).isFile())
     
    }
  });
  // Reference : https://docs.cypress.io/guides/guides/continuous-integration.html#In-Docker
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }
    return launchOptions;
  });
  return config;
};
