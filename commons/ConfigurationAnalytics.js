/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// const https = require('https');
const http = require('http');

const TAGGING_URL = 'http://localhost:2021/getDataByApplication?';
const TAGGING_KEY = Symbol.for('Liverpool.Tagging.equivalences');
const globalSymbols = Object.getOwnPropertySymbols(global);

module.exports = class ConfigurationAnalytics {
  constructor(appKeyId) {
    this.appKeyId = appKeyId;
    console.log('constructor ConfigurationAnalytics');
    this.configure();
  }

  // eslint-disable-next-line class-methods-use-this
  configure() {
    const hasTagging = (globalSymbols.indexOf(TAGGING_KEY) > -1);
    if (!hasTagging) {
      console.log('constructor ConfigurationAnalytics hasTagging');
      const url = `${TAGGING_URL}appKeyId=${this.appKeyId}`;
      http.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            global[TAGGING_KEY] = JSON.parse(body);
            console.log('ASSIGN-OK');
          } catch (error) {
            console.error('Error in assign to object {}', error.message);
          }
        });
      }).on('error', (error) => {
        console.error('Error request failed {}', error.message);
      });
    }
  }

  getGoogleKey() {
    let result = '';
    const equivalences = global[TAGGING_KEY];
    const rta = equivalences.applications[0];
    if (rta != null) {
      if (rta.providers != null) {
        for (let index = 0; index < rta.providers.length; index += 1) {
          // eslint-disable-next-line default-case
          switch (rta.providers[index].name) {
            case 'Google': result = rta.providers[index].key; break;
          }
        }
      }
    }
    console.log('getGoogleKey:{}', result);
    return result;
  }
};
